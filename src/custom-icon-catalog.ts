// Import platform icons
import AndroidIcon from "./assets/images/platform-icons/android.svg?react"
import IosIcon from "./assets/images/platform-icons/ios.svg?react"
import LinuxIcon from "./assets/images/platform-icons/linux.svg?react"
import MacosIcon from "./assets/images/platform-icons/macos.svg?react"
import SynologyIcon from "./assets/images/platform-icons/synology.svg?react"
import WindowsIcon from "./assets/images/platform-icons/windows.svg?react"

// Import pricing icons
import BusinessPlanIcon from "./assets/images/pricing-icons/business.svg?react"
import EnterprisePlanIcon from "./assets/images/pricing-icons/enterprise.svg?react"
import FreeIcon from "./assets/images/pricing-icons/free.svg?react"
import GithubPlanIcon from "./assets/images/pricing-icons/github.svg?react"
import PersonalProPlanIcon from "./assets/images/pricing-icons/personal-pro.svg?react"
import PremiumIcon from "./assets/images/pricing-icons/premium.svg?react"
import StarterIcon from "./assets/images/pricing-icons/starter.svg?react"
import TeamPlanIcon from "./assets/images/pricing-icons/team.svg?react"

// Import provider icons
import AWSS3Icon from "./assets/images/provider-icons/aws-s3.svg?react"
import AxiomIcon from "./assets/images/provider-icons/axiom.svg?react"
import CriblIcon from "./assets/images/provider-icons/cribl.svg?react"
import DatadogIcon from "./assets/images/provider-icons/datadog.svg?react"
import DockerLogo from "./assets/images/provider-icons/docker.svg?react"
import ElasticsearchIcon from "./assets/images/provider-icons/elasticsearch.svg?react"
import GithubLogo from "./assets/images/provider-icons/github.svg?react"
import GoogleIcon from "./assets/images/provider-icons/google.svg?react"
import KubernetesLogo from "./assets/images/provider-icons/kubernetes.svg?react"
import MicrosoftIcon from "./assets/images/provider-icons/microsoft.svg?react"
import OktaIcon from "./assets/images/provider-icons/okta.svg?react"
import PantherIcon from "./assets/images/provider-icons/panther.svg?react"
import SplunkIcon from "./assets/images/provider-icons/splunk.svg?react"

// Import other icons
import BuildingIcon from "./assets/images/generic-icons/building.svg?react"
import NasLogo from "./assets/images/generic-icons/nas.svg?react"
import SshLogo from "./assets/images/generic-icons/ssh.svg?react"
import VscodeLogo from "./assets/images/generic-icons/vscode.svg?react"
import {
  AppConnector,
  CloudCheck,
  DevicePlus,
  Dice,
  DragHandle,
  Idle,
  Magic,
  Stamp,
  StarFilled,
} from "./icons"

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
  { name: AppConnector, title: "app-connector" },
  { name: BuildingIcon, title: "building" },
  { name: CloudCheck, title: "cloud-check" },
  { name: DevicePlus, title: "device-plus" },
  { name: Dice, title: "dice" },
  { name: DragHandle, title: "drag-handle" },
  { name: Idle, title: "idle" },
  { name: Magic, title: "magic-dns" },
  { name: NasLogo, title: "nas" },
  { name: SshLogo, title: "ssh" },
  { name: Stamp, title: "stamp" },
  { name: StarFilled, title: "star-filled" },
  { name: VscodeLogo, title: "vscode" },
]
