'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useHackillinois2025Program } from './hackillinois2025-data-access'
import { Hackillinois2025Create, Hackillinois2025List } from './hackillinois2025-ui'

export default function Hackillinois2025Feature() {
  const { publicKey } = useWallet()
  const { programId } = useHackillinois2025Program()

  return publicKey ? (
    <div>
      <AppHero
        title="Hackillinois2025"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <Hackillinois2025Create />
      </AppHero>
      <Hackillinois2025List />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
