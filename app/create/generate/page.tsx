'use client';

import { Header } from "@/components/header";
import { Steps } from "@/components/steps";
import GenerationHandler from "./generation-handler";

export default function GeneratePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Génération du CV</h1>
              <p className="text-muted-foreground">
                Vérifiez les informations et lancez la génération de votre CV optimisé
              </p>
            </div>

            <Steps
              steps={[
                { id: "upload", title: "Import du CV", status: "complete" },
                { id: "description", title: "Description", status: "complete" },
                { id: "generate", title: "Génération", status: "current" },
              ]}
            />

            <GenerationHandler key={Date.now()} />
          </div>
        </div>
      </main>
    </div>
  );
}
