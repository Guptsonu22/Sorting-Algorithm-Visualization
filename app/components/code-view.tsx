"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAlgorithmCode } from "../lib/algorithm-code"

interface CodeViewProps {
  algorithm: string
}

export function CodeView({ algorithm }: CodeViewProps) {
  const languages = ["c", "cpp", "java", "python", "javascript"]

  return (
    <Tabs defaultValue="cpp" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        {languages.map((lang) => (
          <TabsTrigger key={lang} value={lang} className="capitalize">
            {lang === "cpp" ? "C++" : lang}
          </TabsTrigger>
        ))}
      </TabsList>
      {languages.map((lang) => (
        <TabsContent key={lang} value={lang}>
          <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
            <code>{getAlgorithmCode(algorithm, lang)}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  )
}

