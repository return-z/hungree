-- CreateTable
CREATE TABLE "dim_merchant" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "radius" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "clerk_uuid" TEXT,

    CONSTRAINT "dim_merchant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "item_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "merchant_uuid" UUID,
    "item_name" TEXT,
    "item_price" DOUBLE PRECISION,
    "is_available" BOOLEAN,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("item_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "dim_merchant_uuid_key" ON "dim_merchant"("uuid");
