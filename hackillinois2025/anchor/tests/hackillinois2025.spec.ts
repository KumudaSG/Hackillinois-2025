import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Hackillinois2025} from '../target/types/hackillinois2025'

describe('hackillinois2025', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Hackillinois2025 as Program<Hackillinois2025>

  const hackillinois2025Keypair = Keypair.generate()

  it('Initialize Hackillinois2025', async () => {
    await program.methods
      .initialize()
      .accounts({
        hackillinois2025: hackillinois2025Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([hackillinois2025Keypair])
      .rpc()

    const currentCount = await program.account.hackillinois2025.fetch(hackillinois2025Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Hackillinois2025', async () => {
    await program.methods.increment().accounts({ hackillinois2025: hackillinois2025Keypair.publicKey }).rpc()

    const currentCount = await program.account.hackillinois2025.fetch(hackillinois2025Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Hackillinois2025 Again', async () => {
    await program.methods.increment().accounts({ hackillinois2025: hackillinois2025Keypair.publicKey }).rpc()

    const currentCount = await program.account.hackillinois2025.fetch(hackillinois2025Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Hackillinois2025', async () => {
    await program.methods.decrement().accounts({ hackillinois2025: hackillinois2025Keypair.publicKey }).rpc()

    const currentCount = await program.account.hackillinois2025.fetch(hackillinois2025Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set hackillinois2025 value', async () => {
    await program.methods.set(42).accounts({ hackillinois2025: hackillinois2025Keypair.publicKey }).rpc()

    const currentCount = await program.account.hackillinois2025.fetch(hackillinois2025Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the hackillinois2025 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        hackillinois2025: hackillinois2025Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.hackillinois2025.fetchNullable(hackillinois2025Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
