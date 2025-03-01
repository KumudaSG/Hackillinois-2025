// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import Hackillinois2025IDL from '../target/idl/hackillinois2025.json'
import type { Hackillinois2025 } from '../target/types/hackillinois2025'

// Re-export the generated IDL and type
export { Hackillinois2025, Hackillinois2025IDL }

// The programId is imported from the program IDL.
export const HACKILLINOIS2025_PROGRAM_ID = new PublicKey(Hackillinois2025IDL.address)

// This is a helper function to get the Hackillinois2025 Anchor program.
export function getHackillinois2025Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...Hackillinois2025IDL, address: address ? address.toBase58() : Hackillinois2025IDL.address } as Hackillinois2025, provider)
}

// This is a helper function to get the program ID for the Hackillinois2025 program depending on the cluster.
export function getHackillinois2025ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Hackillinois2025 program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return HACKILLINOIS2025_PROGRAM_ID
  }
}
