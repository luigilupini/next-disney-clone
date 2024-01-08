"use client"

import { useRouter } from "next/navigation"
// ...
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// ⭐️ Define the shape of your form using a Zod schema. You can read more about
// using Zod in the Zod documentation. https://zod.dev/
const formSchema = z.object({
  input: z.string().min(2).max(50),
})

export default function SearchInput() {
  const router = useRouter()

  // ⭐️ 1. Define your form structure.
  // Use the useForm hook from react-hook-form to create a form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  })

  // ⭐️ 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated because we are using Zod.
    // We do not need to use TypeScript and validated outside of Zod!
    router.push(`/search/${values.input}`)
    form.reset() // ⭐️ 5. Reset the form after submission.
  }

  return (
    <Form
      {...form}
      // ⭐️ 3. Pass and spread the data into the Form component.
      // We can now use the <Form /> components to build our form.
      // User the wrapper function provided by the form hook.
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          // ⭐️ 4. Use the <FormField /> component to wrap form fields.
          // The control prop tells us what form we attached to in the hook.
          // Since <FormField /> is using a controlled component, you need to provide
          // a default value for the field. See React Hook Form docs for more info.
          //https://react-hook-form.com/docs/usecontroller
          control={form.control}
          // The name prop tells us what field we are using in the form.
          // This is also defined in the Zod schema above.
          name="input"
          // The render prop is a function that returns a React component. We
          // can use this to render any component we want. We spread the field
          // value into a component, that likely has a handler like onChange.

          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="search"
                  placeholder="Search here"
                  className="min-w-52 bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
