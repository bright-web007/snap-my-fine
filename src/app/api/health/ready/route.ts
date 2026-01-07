import { NextResponse } from 'next/server';
import { getProbeHandler } from '../../../../lib/health/kubernetes-probes';
import { withHealthSecurity } from '../../../../lib/health/security-middleware';

const probeHandler = getProbeHandler();

async function handleReadinessProbe(): Promise<NextResponse> {
  return probeHandler.handleReadinessProbe();
}

// Apply security middleware with custom config for K8s probes
export const GET = withHealthSecurity(handleReadinessProbe);