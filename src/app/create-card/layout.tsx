import { getTemplates } from "../../../actions/cardActions";
import FormFieldsProvider from "./context";

export default async function CreateCardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const templates = await getTemplates();

  return (
    <FormFieldsProvider templates={templates}>{children}</FormFieldsProvider>
  );
}
