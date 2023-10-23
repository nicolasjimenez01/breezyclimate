'use client'
import RecLaminaForm from "@/components/forms/reclamina/RecLamina"
import { RecoilRoot } from 'recoil';

export default function RecLamina() {

  return (
    <>
    <div className="flex items-center justify-center h-screen mx-4">
      <RecoilRoot>
        <RecLaminaForm/>
      </RecoilRoot>
    </div>
    </>
  )
}