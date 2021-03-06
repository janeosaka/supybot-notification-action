import * as core from '@actions/core';
import fetch, { Response } from 'node-fetch';

export function sendIRCMessage(message: string, channel: string): Promise<Response> {
    channel = channel.replace('#', '+');

    const supybotHostname = core.getInput('hostname', { required: true });
    const supybotPassword = core.getInput('credentials', { required: true });

    core.setSecret(supybotPassword);

    // This `password` is unused, just ignore it
    const url = `http://${supybotHostname}/password/${channel}`;
    const json = `payload=${encodeURIComponent(JSON.stringify({ message }))}`;

    return fetch(url, {
        method: 'POST',
        body: json,
        headers: {
            'Authorization': `Basic ${Buffer.from(supybotPassword).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}
