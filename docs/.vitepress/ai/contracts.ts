export type Control = {
  type: 'string' | 'number' | 'integer' | 'boolean';
  enum?: (string | number)[]; minimum?: number; maximum?: number; description?: string;
};

export type Visualization = {
  id: string; description: string; controls: Record<string, Control>;
  ready: () => boolean; read: () => unknown;
  update: (changes: Record<string, unknown>) => unknown | Promise<unknown>;
};

// WebMCP inputSchema describes inputs but does not enforce them at execution time.
export function validateInput(input: unknown, allowed: string[], required: string[] = []): asserts input is Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Tool input must be an object.');
  const keys = Object.keys(input);
  if (keys.some(key => !allowed.includes(key))) throw new Error('Unexpected tool parameter.');
  if (required.some(key => !Object.hasOwn(input, key))) throw new Error('Required tool parameter is missing.');
}

export function validateChanges(changes: unknown, controls: Record<string, Control>): asserts changes is Record<string, unknown> {
  if (!changes || typeof changes !== 'object' || Array.isArray(changes) || !Object.keys(changes).length) throw new Error('Provide at least one control change.');
  for (const [key, value] of Object.entries(changes)) {
    if (!Object.hasOwn(controls, key)) throw new Error(`Unknown control: ${key}`);
    const control = controls[key];
    const validType = control.type === 'integer' ? Number.isInteger(value) : typeof value === control.type;
    if (!validType || (typeof value === 'number' && !Number.isFinite(value))) throw new Error(`Invalid type for ${key}`);
    if (control.enum && !control.enum.includes(value as string | number)) throw new Error(`Invalid value for ${key}`);
    if (typeof value === 'number' && ((control.minimum !== undefined && value < control.minimum) || (control.maximum !== undefined && value > control.maximum))) throw new Error(`Out of range: ${key}`);
  }
}

export function toolError(error: unknown) {
  return { error: error instanceof Error ? error.message : 'Unable to complete this tool call.' };
}
