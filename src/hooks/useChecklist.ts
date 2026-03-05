import { useEffect } from 'react'
import useDataStore from '@/stores/useDataStore'
import { toast } from '@/hooks/use-toast'

export function useChecklist(tripId: string) {
  const {
    checklistItems,
    categories,
    addChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    seedChecklist,
  } = useDataStore()

  const items = checklistItems.filter((i) => i.tripId === tripId)

  useEffect(() => {
    if (items.length === 0 && tripId) {
      seedChecklist(tripId)
    }
  }, [tripId, items.length, seedChecklist])

  const toggleStatus = (id: string, isCompleted: boolean) => {
    updateChecklistItem(id, { isCompleted })
  }

  const addCustomItem = (categoryId: string, title: string) => {
    try {
      addChecklistItem({
        tripId,
        categoryId,
        title,
        isCompleted: false,
        isCustom: true,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível adicionar o item.',
      })
    }
  }

  const deleteCustomItem = (id: string) => {
    const item = checklistItems.find((i) => i.id === id)

    // Ensure deleteCustomItem verifies the is_custom property before removal
    if (item && item.isCustom) {
      deleteChecklistItem(id)
    } else {
      toast({
        variant: 'destructive',
        title: 'Ação não permitida',
        description: 'Não é possível remover itens base do sistema.',
      })
    }
  }

  return {
    items,
    categories,
    toggleStatus,
    addCustomItem,
    deleteCustomItem,
  }
}
