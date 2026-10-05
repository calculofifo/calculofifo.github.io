"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>¿Reiniciar el progreso del curso?</DialogTitle>
        <DialogDescription>
          Se borrarán tus respuestas y el avance de este curso en este navegador. Tus certificados
          se mantienen.
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Reiniciar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
