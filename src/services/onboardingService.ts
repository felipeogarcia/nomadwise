/**
 * Valida um código de cupom no servidor.
 * (Mock implementation for demonstration)
 */
export const validateCoupon = async (code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Cupom válido de exemplo: NOMAD2024
      resolve(code.toUpperCase() === 'NOMAD2024')
    }, 800)
  })
}
