// Import platform icons
import AndroidIcon from "src/assets/images/platform-icons/android.svg?react"
import IosIcon from "src/assets/images/platform-icons/ios.svg?react"
import LinuxIcon from "src/assets/images/platform-icons/linux.svg?react"
import MacosIcon from "src/assets/images/platform-icons/macos.svg?react"
import SynologyIcon from "src/assets/images/platform-icons/synology.svg?react"
import WindowsIcon from "src/assets/images/platform-icons/windows.svg?react"

// Import pricing icons
import BusinessPlanIcon from "src/assets/images/pricing-icons/business.svg?react"
import EnterprisePlanIcon from "src/assets/images/pricing-icons/enterprise.svg?react"
import FreeIcon from "src/assets/images/pricing-icons/free.svg?react"
import GithubPlanIcon from "src/assets/images/pricing-icons/github.svg?react"
import PersonalProPlanIcon from "src/assets/images/pricing-icons/personal-pro.svg?react"
import PremiumIcon from "src/assets/images/pricing-icons/premium.svg?react"
import StarterIcon from "src/assets/images/pricing-icons/starter.svg?react"
import TeamPlanIcon from "src/assets/images/pricing-icons/team.svg?react"

// Import provider icons
import AWSS3Icon from "src/assets/images/provider-icons/aws-s3.svg?react"
import AxiomIcon from "src/assets/images/provider-icons/axiom.svg?react"
import CriblIcon from "src/assets/images/provider-icons/cribl.svg?react"
import DatadogIcon from "src/assets/images/provider-icons/datadog.svg?react"
import DockerLogo from "src/assets/images/provider-icons/docker.svg?react"
import ElasticsearchIcon from "src/assets/images/provider-icons/elasticsearch.svg?react"
import GithubLogo from "src/assets/images/provider-icons/github.svg?react"
import GoogleIcon from "src/assets/images/provider-icons/google.svg?react"
import KubernetesLogo from "src/assets/images/provider-icons/kubernetes.svg?react"
import MicrosoftIcon from "src/assets/images/provider-icons/microsoft.svg?react"
import OktaIcon from "src/assets/images/provider-icons/okta.svg?react"
import PantherIcon from "src/assets/images/provider-icons/panther.svg?react"
import SplunkIcon from "src/assets/images/provider-icons/splunk.svg?react"

// Import other icons
import BuildingIcon from "src/assets/images/generic-icons/building.svg?react"
import NasLogo from "src/assets/images/generic-icons/nas.svg?react"
import SshLogo from "src/assets/images/generic-icons/ssh.svg?react"
import VscodeLogo from "src/assets/images/generic-icons/vscode.svg?react"
import { Dice, DragHandle, Idle, Magic } from "src/icons"

export interface IconsMeta {
  name: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
}

// Icon lists
export const PlatformIcons: IconsMeta[] = [
  { name: AndroidIcon, title: "android" },
  { name: IosIcon, title: "ios" },
  { name: LinuxIcon, title: "linux" },
  { name: MacosIcon, title: "macos" },
  { name: SynologyIcon, title: "synology" },
  { name: WindowsIcon, title: "windows" },
]
export const PricingIcons: IconsMeta[] = [
  { name: FreeIcon, title: "free" },
  { name: PersonalProPlanIcon, title: "personal-pro" },
  { name: GithubPlanIcon, title: "github" },
  { name: TeamPlanIcon, title: "team" },
  { name: BusinessPlanIcon, title: "business" },
  { name: StarterIcon, title: "starter" },
  { name: PremiumIcon, title: "premium" },
  { name: EnterprisePlanIcon, title: "enterprise" },
]
export const ProviderIcons: IconsMeta[] = [
  { name: GoogleIcon, title: "google" },
  { name: MicrosoftIcon, title: "microsoft" },
  { name: OktaIcon, title: "okta" },
  { name: AxiomIcon, title: "axiom" },
  { name: SplunkIcon, title: "splunk" },
  { name: PantherIcon, title: "panther" },
  { name: CriblIcon, title: "cribl" },
  { name: DatadogIcon, title: "datadog" },
  { name: ElasticsearchIcon, title: "elastic" },
  { name: DockerLogo, title: "docker" },
  { name: KubernetesLogo, title: "kubernetes" },
  { name: GithubLogo, title: "github" },
  { name: AWSS3Icon, title: "s3" },
]
export const OtherIcons: IconsMeta[] = [
  { name: Dice, title: "dice" },
  { name: DragHandle, title: "drag-handle" },
  { name: Idle, title: "idle" },
  { name: Magic, title: "magic-dns" },
  { name: SshLogo, title: "ssh" },
  { name: NasLogo, title: "nas" },
  { name: VscodeLogo, title: "vscode" },
  { name: BuildingIcon, title: "building" },
]
