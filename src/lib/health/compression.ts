import { NextRequest } from 'next/server';

/**
 * Response compression utilities for health check endpoints
 */

export interface CompressionHeaders {
  [key: string]: string;
}

export function addCompressionHeaders(headers: CompressionHeaders = {}): CompressionHeaders {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': headers['Cache-Control'] || 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Content-Type-Options': 'nosniff',
    'X-Health-Check-Version': '1.0',
    ...headers
  };
}

export class ResponseCompressor {
  private shouldCompress(request: NextRequest, data: unknown): boolean {
    // Check if client accepts gzip/deflate compression
    const acceptEncoding = request.headers.get('accept-encoding') || '';
    const supportsCompression = acceptEncoding.includes('gzip') || acceptEncoding.includes('deflate');
    
    if (!supportsCompression) {
      return false;
    }

    // Only compress responses larger than 1KB
    const dataSize = JSON.stringify(data).length;
    return dataSize > 1024;
  }

  async compressResponse(
    request: NextRequest,
    data: unknown,
    headers: CompressionHeaders = {}
  ): Promise<Response> {
    const jsonData = JSON.stringify(data, null, 2);
    const shouldCompress = this.shouldCompress(request, data);

    const finalHeaders = addCompressionHeaders(headers);

    if (shouldCompress) {
      try {
        // Use built-in compression if available in the runtime environment
        if (typeof CompressionStream !== 'undefined') {
          const stream = new CompressionStream('gzip');
          const writer = stream.writable.getWriter();
          const reader = stream.readable.getReader();
          
          writer.write(new TextEncoder().encode(jsonData));
          writer.close();
          
          const chunks: Uint8Array[] = [];
          let done = false;
          
          while (!done) {
            const result = await reader.read();
            done = result.done;
            if (result.value) {
              chunks.push(result.value);
            }
          }
          
          const compressedData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
          let offset = 0;
          
          for (const chunk of chunks) {
            compressedData.set(chunk, offset);
            offset += chunk.length;
          }
          
          finalHeaders['Content-Encoding'] = 'gzip';
          finalHeaders['Content-Length'] = compressedData.length.toString();
          finalHeaders['X-Compression'] = 'gzip';
          
          return new Response(compressedData, {
            status: 200,
            headers: finalHeaders
          });
        }
      } catch (error) {
        console.warn('Compression failed, falling back to uncompressed response:', error);
      }
    }

    // Fallback to uncompressed response
    finalHeaders['Content-Length'] = new TextEncoder().encode(jsonData).length.toString();
    finalHeaders['X-Compression'] = 'none';
    
    return new Response(jsonData, {
      status: 200,
      headers: finalHeaders
    });
  }

  // Helper method for simple JSON responses without compression
  jsonResponse(data: unknown, headers: CompressionHeaders = {}): Response {
    const jsonData = JSON.stringify(data, null, 2);
    const finalHeaders = addCompressionHeaders(headers);
    
    finalHeaders['Content-Length'] = new TextEncoder().encode(jsonData).length.toString();
    finalHeaders['X-Compression'] = 'none';
    
    return new Response(jsonData, {
      status: 200,
      headers: finalHeaders
    });
  }
}

// Singleton instance for reuse
let compressorInstance: ResponseCompressor | null = null;

export function getResponseCompressor(): ResponseCompressor {
  if (!compressorInstance) {
    compressorInstance = new ResponseCompressor();
  }
  return compressorInstance;
}

// Utility function for quick header setup
export function createHealthHeaders(cacheControl?: string): CompressionHeaders {
  return addCompressionHeaders({
    'Cache-Control': cacheControl || 'public, max-age=30',
    'X-Service': 'snapmyfine',
    'X-Health-Check': 'enabled'
  });
}