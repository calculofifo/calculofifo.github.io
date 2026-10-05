"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, ChoiceItem, type ChoiceStatus } from "@/components/ui/choice-group";
import { Callout } from "@/components/ui/callout";

const options = [
  { id: "a", text: "Mantiene su valor: 100 € siguen siendo 100 €." },
  { id: "b", text: "Pierde poder de compra: con 100 € podrás comprar menos cosas." },
  { id: "c", text: "Gana valor automáticamente con el tiempo." },
];
const correctId = "b";

export function QuizDemo() {
  const [selected, setSelected] = useState<string>("");
  const [checked, setChecked] = useState(false);

  const statusFor = (id: string): ChoiceStatus | undefined => {
    if (!checked) return undefined;
    if (id === correctId) return "correct";
    if (id === selected) return "incorrect";
    return undefined;
  };

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <p id="quiz-demo-q" className="text-lg font-medium">
        Si la inflación es del 3 % y guardas 100 € en un cajón durante un año, ¿qué pasa?
      </p>
      <ChoiceGroup
        aria-labelledby="quiz-demo-q"
        value={selected}
        onValueChange={setSelected}
        disabled={checked}
      >
        {options.map((option, index) => (
          <ChoiceItem
            key={option.id}
            value={option.id}
            letter={String.fromCharCode(65 + index)}
            status={statusFor(option.id)}
          >
            {option.text}
          </ChoiceItem>
        ))}
      </ChoiceGroup>
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {checked ? (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Callout
                tone={selected === correctId ? "success" : "danger"}
                title={selected === correctId ? "Correcto" : "No exactamente"}
              >
                Los billetes no cambian, pero los precios suben. Con un 3 % de inflación, lo que hoy
                cuesta 100 € costará unos 103 € dentro de un año.
              </Callout>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        {checked ? (
          <Button
            variant="secondary"
            onClick={() => {
              setChecked(false);
              setSelected("");
            }}
          >
            Reintentar
          </Button>
        ) : (
          <Button disabled={!selected} onClick={() => setChecked(true)}>
            Comprobar
          </Button>
        )}
      </div>
    </div>
  );
}
