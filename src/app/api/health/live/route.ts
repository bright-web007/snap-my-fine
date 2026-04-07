import { NextResponse } from 'next/server';
import { getProbeHandler } from '../../../../lib/health/kubernetes-probes';
import { withHealthSecurity } from '../../../../lib/health/security-middleware';

const probeHandler = getProbeHandler();

async function handleLivenessProbe(): Promise<NextResponse> {
  return probeHandler.handleLivenessProbe();
}

// Apply security middleware with custom config for K8s probes
export const GET = withHealthSecurity(handleLivenessProbe);