import { useState } from 'react'
import { validateCoupon } from '@/services/onboardingService'
import useAuthStore from '@/stores/useAuthStore'
import { toast } from '@/hooks/use-toast'

interface OnboardingData {
  fullName: string
  phone: string
  cpf: string
  birthDate: string
  couponCode?: string
}

export function useOnboarding() {
  const { completeProfile } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const submitProfile = async (data: OnboardingData): Promise<boolean> => {
    setIsLoading(true)
    try {
      if (data.couponCode) {
        const isValid = await validateCoupon(data.couponCode)
        if (!isValid) {
          toast({
            title: 'Cupom inválido',
            description: 'O código informado não é válido ou já expirou.',
            variant: 'destructive',
          })
          return false
        }
        toast({
          title: 'Cupom aplicado!',
          description: 'Você garantiu benefícios exclusivos na sua assinatura.',
        })
      }

      completeProfile({
        name: data.fullName,
        phone: data.phone,
        cpf: data.cpf,
        birthDate: data.birthDate,
      })

      toast({
        title: 'Perfil ativado',
        description: 'Bem-vindo ao Nomadwise!',
      })
      return true
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Não foi possível salvar seu perfil. Tente novamente.',
        variant: 'destructive',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { submitProfile, isLoading }
}
