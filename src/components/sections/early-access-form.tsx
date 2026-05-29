"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { subscribe } from "@/lib/actions/subscribe";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function EarlyAccessForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return;

    const result = await subscribe({
      firstName: values.firstName,
      email: values.email,
      source: "landing_early_access",
    });

    if (result.status === "confirm_sent") {
      toast.success(result.message, {
        description: `Thanks, ${values.firstName}.`,
      });
      reset();
    } else if (result.status === "already_subscribed") {
      toast.info(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form className="early__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="early__hp"
        {...register("website")}
      />

      <div className="early__fields">
        <div className="early__field">
          <label htmlFor="early-firstName" className="early__label">
            First name
          </label>
          <input
            id="early-firstName"
            className="early__input"
            placeholder="John"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="early__error">{errors.firstName.message}</p>
          )}
        </div>
        <div className="early__field">
          <label htmlFor="early-email" className="early__label">
            Email
          </label>
          <input
            id="early-email"
            type="email"
            className="early__input"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="early__error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn--primary early__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Request early access"}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </button>

      <p className="early__note">
        We&apos;ll send a confirmation link. Unsubscribe any time.
      </p>
    </form>
  );
}
