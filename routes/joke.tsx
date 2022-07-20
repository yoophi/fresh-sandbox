// routes/github/[username].tsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Message {
  message: string;
}

export const handler: Handlers<Message | null> = {
  async GET(_, ctx) {
    const resp = await fetch(
      `http://${ctx.localAddr.hostname}:${ctx.localAddr.port}/api/joke`
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const message: Message = await resp.json();
    return ctx.render(message);
  },
};

export default function Page({ data }: PageProps<Message | null>) {
  if (!data) {
    return <h1>Message not found</h1>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
