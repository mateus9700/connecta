'use client'

import { toast } from 'sonner'
import { BecomeDoneeModal } from '@/components/modals/become-donee-modal'
import { Button } from '@/components/button'
import { api } from '@/utils/api'
import { User } from '@/@types/User'
import { HandHeart } from 'lucide-react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../modals/confirmation-modal'

interface ProfileRoleProps {
  profile: User
}

export function ProfileRole({ profile }: ProfileRoleProps) {
  const router = useRouter()

  async function handleBecomeDonor() {
    const userCookie = Cookies.get('user')

    if (!userCookie) return

    toast.promise(
      async () =>
        await fetch(`${api}/users/${profile.userID}/donor-role`, {
          headers: {
            User: userCookie,
          },
        }),
      {
        success: () => {
          router.refresh()

          return 'Função de doador ativada. Você pode solicitar ser donatário novamente quando quiser.'
        },
        error: 'Erro ao ativar a função de doador. Tente novamente mais tarde.',
      },
    )
  }

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-zinc-800">Função atual</h3>
        <p>
          {profile.role === 'doador'
            ? 'Você está registrado como doador e pode contribuir com doações. Para receber itens, encerre sua função como doador e torne-se donatário.'
            : 'Você está registrado como donatário e pode receber doações conforme sua necessidade. Para doar itens, encerre sua participação como donatário e torne-se doador.'}
        </p>
      </div>

      {profile.role === 'doador' ? (
        <BecomeDoneeModal doneeRequested={profile.doneeRequested} />
      ) : (
        <ConfirmationModal
          title="Alterar para Doador"
          description="Tem certeza de que deseja voltar a ser doador? Será necessário solicitar para ser donatário novamente."
          onConfirm={() => handleBecomeDonor()}
        >
          <Button size="full" className="md:w-fit lg:w-full">
            <span>Tornar doador</span>
            <HandHeart className="size-5 shrink-0" />
          </Button>
        </ConfirmationModal>
      )}
    </>
  )
}
