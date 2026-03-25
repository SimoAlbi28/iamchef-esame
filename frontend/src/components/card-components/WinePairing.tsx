import type { WinePairing } from "../../types/recipes"

type WinePairingProps = {
    winePairing: WinePairing
}

const WinePairingComponent = ({winePairing}: WinePairingProps) => {
  return (
    <section className="mt-2">
        <h2 className="text-sm font-bold text-green-700">Suggerimento vino</h2>
        <div className="text-xs text-gray-700 bg-yellow-50 p-2 rounded-lg">
        {winePairing.pairingText}
        </div>
  </section>
  )
}

export default WinePairingComponent