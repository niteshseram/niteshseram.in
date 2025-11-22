-- CreateTable
CREATE TABLE "Views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Reactions" (
    "slug" VARCHAR(128) NOT NULL,
    "likes" BIGINT NOT NULL DEFAULT 1,
    "loves" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "isLoved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
