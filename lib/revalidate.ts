import { revalidatePath } from "next/cache";
import { GROUPS } from "@/lib/collections";

export function revalidatePublic() {
  try {
    revalidatePath("/");
    revalidatePath("/offers");
    for (const g of GROUPS) revalidatePath(`/collections/${g.slug}`);
  } catch {
    // best-effort; safe to ignore
  }
}
