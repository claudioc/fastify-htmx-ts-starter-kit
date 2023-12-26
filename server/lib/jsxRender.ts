// Almost directly from https://evertpot.com/jsx-template/

import { onSendHookHandler, preSerializationHookHandler } from 'fastify';
import { isValidElement, JSX } from 'preact';
import render from 'preact-render-to-string';

/**
 * The preserialization hook lets us transform the response body
 * before it's json-encoded.
 *
 * We use this to turn React components into an object with a ___jsx key
 * that has the serialized HTML.
 */
export const preSerialization: preSerializationHookHandler<unknown> = async (
  _request,
  reply,
  payload: unknown
) => {
  if (isValidElement(payload)) {
    reply.header('Content-Type', 'text/html');
    return {
      ___jsx: '<!DOCTYPE html>\n' + render(payload as JSX.Element),
    };
  } else {
    return payload;
  }
};

/**
 * The onSendHookHandler lets us transform the response body (as a string)
 * We detect the ___jsx key and unwrap the HTML.
 */
export const onSend: onSendHookHandler<unknown> = async (
  _request,
  _reply,
  payload: unknown
) => {
  if (typeof payload === 'string' && payload.startsWith('{"___jsx":"')) {
    return JSON.parse(payload).___jsx;
  }
  return payload;
};

export default {
  preSerialization,
  onSend,
};
