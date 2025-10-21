import { Link, useNavigate } from "react-router-dom";
import { PinInput } from '@chakra-ui/pin-input'
import { PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import { type ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../services/AuthServices";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {

  const navigate = useNavigate()

  const [token, setToken] = useState<ConfirmToken['token']>('')
  
  const handleChange = (token: ConfirmToken['token']) =>{
    setToken(token)
  }

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) =>{
        toast.error(error.message)
    },
    onSuccess: (data) =>{
        toast.success(data)
        navigate('/auth/login')
    }
  })

  const handleComplete = (token: ConfirmToken['token']) =>{
    // console.log(token)
    mutate({ token })
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="w-full flex align-center justify-center gap-3">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray border" />
            </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-new-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}