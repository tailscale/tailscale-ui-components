import type { Stripe } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js/pure"
import { useEffect, useState } from "react"
import useTailnetSettings from "src/hooks/tailnet-settings"
import { isDevInstance } from "src/utils/util"

let stripeClient: Promise<Stripe | null> | null = null
let stripeClientUS: Promise<Stripe | null> | null = null

const stripePublishableKey = isDevInstance()
  ? "pk_test_945ZJdlDc2vv1oe2dKFNWwx200pHgYLmlN"
  : "pk_live_zSTdaojcTSpxEBlcgg3UZNXo00QMuuhbOF"

const stripePublishableKeyUS = isDevInstance()
  ? "pk_test_51PQxAHIRzk6XgwDkk6e8WgsSIjewMTJBJTyO7rwPynN5R5IMfcRgmfnXpQeYrhTlnLKsYtssaKIbvbUEkIeHwcfD00SQ564IjI"
  : "pk_live_51PQxAHIRzk6XgwDkhgaFdwE0wBSHwS82EfjSomwCbUDWow2fpmXR0XFQwEZdMGDSe3p1iX0kWapEUj1iObTMsn0T007fDoEqHN"

const loadStripeClient = async (useUSInstance: boolean | undefined) => {
  if (useUSInstance && !stripeClientUS) {
    stripeClientUS = loadStripe(stripePublishableKeyUS)
  } else if (!useUSInstance && !stripeClient) {
    stripeClient = loadStripe(stripePublishableKey)
  }
  return useUSInstance ? stripeClientUS : stripeClient
}

const useGetStripe = () => {
  const [client, setClient] = useState<Stripe | null>(null)
  const { data: tailnetSettings } = useTailnetSettings()

  useEffect(() => {
    const getStripeClient = async () => {
      const stripe = await loadStripeClient(
        tailnetSettings?.useUSStripeInstance
      )
      setClient(stripe)
    }

    getStripeClient()
  }, [tailnetSettings])

  return client
}

export default useGetStripe
