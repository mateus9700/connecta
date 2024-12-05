'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/button'
import { X, Search, ArrowUpRight } from 'lucide-react'
import { Input } from '../input'
import { CollectionPoints } from '../admin/collection-points'
import { TextArea } from '../text-area'
import { Campaign } from '@/@types/Campaign'
import { CategoryCheckboxes } from '../admin/category-checkboxes'
import Link from 'next/link'

interface ClosedCampaignModalProps {
  campaign: Campaign
}

export function ClosedCampaignModal({ campaign }: ClosedCampaignModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="xs" aria-label="Detalhes da campanha">
          <Search className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

        <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 pr-2.5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
          <Dialog.Close asChild>
            <Button size="xs" variant="outline" className="ml-auto">
              <X className="size-5 shrink-0" />
            </Button>
          </Dialog.Close>

          <header className="max-w-lg space-y-2">
            <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
              Detalhes da Campanha
            </Dialog.Title>

            <Dialog.Description className="text-sm sm:text-base">
              Esta campanha foi finalizada. Consulte os detalhes para mais
              informações.
            </Dialog.Description>
          </header>

          <Link
            href={`/campanhas/${campaign.id}`}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 font-bold text-orange-600 transition-colors hover:text-orange-700"
          >
            Veja os resultados desta campanha
            <ArrowUpRight className="size-5 shrink-0" />
          </Link>

          <form className="space-y-5">
            <Input
              title="Nome da campanha"
              type="text"
              defaultValue={campaign.name}
              disabled
            />

            <CollectionPoints
              initialPoints={campaign.collection_point}
              disabled
            />

            <TextArea
              title="Descrição"
              defaultValue={campaign.description}
              disabled
            />
            <TextArea
              title="Observações"
              defaultValue={campaign.observation}
              disabled
            />

            <CategoryCheckboxes
              selectedCategories={campaign.categories}
              categorySections={campaign.section}
              disabled
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
