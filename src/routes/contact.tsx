import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/site/Field";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Twin Threads" },
      {
        name: "description",
        content: "Get in touch with Twin Threads — orders, sizing, exchanges and collaborations.",
      },
      { property: "og:title", content: "Contact — Twin Threads" },
      { property: "og:description", content: "Orders, sizing, exchanges and collaborations." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success)
      return setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
    setErrors({});
    e.currentTarget.reset();
    toast("Message received. We’ll reply within 24 hours.");
  };
  return (
    <div className="container-editorial grid gap-16 pb-32 pt-36 md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="eyebrow text-muted-foreground">Contact</p>
        <h1 className="display mt-6 text-7xl uppercase md:text-8xl">
          Talk
          <br />
          to us.
        </h1>
        <dl className="mt-14 space-y-6 text-sm">
          <div className="border-t border-border pt-4">
            <dt className="eyebrow text-muted-foreground">Email</dt>
            <dd className="mt-2">
              <a className="link-line" href="mailto:hello@twinthreads.eg">
                hello@twinthreads.eg
              </a>
            </dd>
          </div>
          <div className="border-t border-border pt-4">
            <dt className="eyebrow text-muted-foreground">WhatsApp</dt>
            <dd className="mt-2">+20 100 000 0000</dd>
          </div>
          <div className="border-t border-border pt-4">
            <dt className="eyebrow text-muted-foreground">Studio</dt>
            <dd className="mt-2">Cairo, Egypt</dd>
          </div>
          <div className="border-t border-border pt-4">
            <dt className="eyebrow text-muted-foreground">Social</dt>
            <dd className="mt-2 flex gap-6">
              <a
                className="link-line"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a className="link-line" href="https://tiktok.com" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <form
        onSubmit={submit}
        className="space-y-8 md:col-span-6 md:col-start-7 md:pt-24"
        noValidate
      >
        <Field label="Name" name="name" error={errors.name} />
        <Field label="Email" name="email" type="email" error={errors.email} />
        <Field label="Message" name="message" textarea error={errors.message} />
        <Button variant="editorial" type="submit">
          Send message
        </Button>
      </form>
    </div>
  );
}
