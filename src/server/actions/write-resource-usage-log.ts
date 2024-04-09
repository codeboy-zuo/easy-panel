
import { type ResourceUsageLogDetails } from "@/schema/resourceLog.schema";
import { type Db } from "../db";
import { resourceUsageLogs } from "../db/schema";
import { createCUID } from "@/lib/cuid";
import { ServiceTypeSchema } from "@/server/db/enum";

export async function writeChatResourceUsageLog(
  db: Db,
  {
    userId,
    instanceId,
    text,
    textBytes,
    details,
    createdAt
  }: {
    userId: string;
    instanceId: string;
    text?: string;
    textBytes?: number;
    details: ResourceUsageLogDetails;
    createdAt?: Date;
  },
) {
  return await db
    .insert(resourceUsageLogs)
    .values({
      id: createCUID(),
      userId,
      instanceId,
      type: ServiceTypeSchema.Values.CHATGPT_SHARED,
      text,
      textBytes,
      details,
      createdAt: createdAt ?? new Date(),
    })
    .returning();
}
