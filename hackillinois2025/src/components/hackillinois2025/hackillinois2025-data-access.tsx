'use client'

import { getHackillinois2025Program, getHackillinois2025ProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useHackillinois2025Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getHackillinois2025ProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getHackillinois2025Program(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['hackillinois2025', 'all', { cluster }],
    queryFn: () => program.account.hackillinois2025.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['hackillinois2025', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ hackillinois2025: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useHackillinois2025ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useHackillinois2025Program()

  const accountQuery = useQuery({
    queryKey: ['hackillinois2025', 'fetch', { cluster, account }],
    queryFn: () => program.account.hackillinois2025.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['hackillinois2025', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ hackillinois2025: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['hackillinois2025', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ hackillinois2025: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['hackillinois2025', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ hackillinois2025: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['hackillinois2025', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ hackillinois2025: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
