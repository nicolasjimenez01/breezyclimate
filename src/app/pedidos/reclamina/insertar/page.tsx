'use client'
import RecLaminaForm from "@/components/forms/reclamina/RecLamina"
import { RecoilRoot } from 'recoil';
import StepperWithContent from "@/components/stepper";

export default function RecLamina() {

  return (
    <>
      {/* <div className="w-100 bg-grey">
      <StepperWithContent/>
      </div> */}
    <div className="flex items-center justify-center h-screen mx-4">
      <RecoilRoot>
        <RecLaminaForm/>
      </RecoilRoot>
    </div>
    </>
  )
}