/* eslint-disable @typescript-eslint/no-restricted-imports */
import React from "react"
/**
 * Import Icons that require customization
 */
import { LucideProps, Star } from "lucide-react"
/**
 * This file exports all the icons available to our app. Since we tree-shake our
 * imports, only required icons will be used.
 *
 * To use an icon not in the list below, check https://lucide.dev/icons/ for
 * supported icons and add them to the list.
 */

export {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpCircle,
  ArrowUpRight,
  AtSign,
  BatteryFull,
  Book,
  BookOpen,
  Boxes,
  Briefcase,
  BugOff,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDownUp,
  ChevronsLeft,
  ChevronsLeftRightEllipsis,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  CircleSlash,
  Clock,
  Cloud,
  Compass,
  Computer,
  Copy,
  CornerDownRight,
  CreditCard,
  Database,
  DollarSign,
  Download,
  DownloadCloud,
  Edit,
  ExternalLink,
  Eye,
  FileSymlink,
  FileText,
  Filter,
  Gift,
  GitBranch,
  Github as GitHub,
  Globe,
  GlobeLock,
  Heart,
  HelpCircle,
  Home,
  Inbox,
  Info,
  CircleCheck as InnerCheckCircle,
  Key,
  KeyRound,
  Lightbulb,
  Link,
  Lock,
  Mail,
  MapPin,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  Network,
  PencilRuler,
  PenLine,
  PlayCircle,
  Plus,
  PlusCircle,
  ScreenShare,
  Search,
  Server,
  Settings,
  Shapes,
  Share,
  Share2,
  Shield,
  ShieldBan,
  ShieldCheck,
  Shuffle,
  Slash,
  Star,
  Sun,
  Tag,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  Unlock,
  User,
  UserCheck,
  Users,
  Voicemail,
  Wand,
  Waypoints,
  Webhook,
  Wifi,
  X,
} from "lucide-react"

export type IconType = React.ComponentType<LucideProps>

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
  label?: string
}

/**
 * ButtonChevronDown is a chevron icon with an adjusted size and alignment for
 * use alongside text in buttons and dropdowns.
 */
export function ButtonChevronDown({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M5 9.5L12 16.5L19 9.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * StarFilled is a star icon with a filled appearance, commonly used to represent
 * favorites, ratings, or highlights.
 */
export function StarFilled(props: LucideProps) {
  return <Star strokeWidth="1" fill="currentColor" {...props} />
}

/**
 * Dice icon representing a classic 3D six-sided die.
 */
export function Dice({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.555 2.34556L11.5559 2.34511C11.694 2.27669 11.846 2.24109 12 2.24109C12.1541 2.24109 12.3061 2.27669 12.4442 2.34511L12.445 2.34556L19.759 6.00252L12 9.88198L4.24113 6.00252L11.555 2.34556ZM3.00005 7.61805V16.767C2.99875 16.9534 3.04954 17.1364 3.14672 17.2954C3.24374 17.4542 3.38313 17.5827 3.5492 17.6666L11 21.392V11.618L3.00005 7.61805ZM20.4428 17.6656L13 21.387V11.6181L21 7.61804V16.7695C20.9999 16.9555 20.948 17.1379 20.8499 17.296C20.7519 17.4541 20.6117 17.5817 20.445 17.6645L20.4428 17.6656ZM13.335 0.554497L12.89 1.45003L13.3373 0.555601L21.335 4.5545L21.3363 4.55513C21.8356 4.80352 22.2557 5.18614 22.5496 5.66006C22.8438 6.13439 22.9998 6.6819 23 7.24003V16.7706C22.9998 17.3287 22.8438 17.8757 22.5496 18.35C22.2557 18.824 21.8354 19.2067 21.336 19.4551L21.335 19.4556L13.3373 23.4545C12.9206 23.6629 12.461 23.7715 11.995 23.7715C11.529 23.7715 11.0693 23.6629 10.6525 23.4543L2.65283 19.4545L2.65007 19.4531C2.15077 19.2015 1.7317 18.8154 1.44015 18.3383C1.14927 17.8623 0.996878 17.3147 1.00005 16.7569L1.00005 7.2395C1.00034 6.68137 1.15633 6.13439 1.45047 5.66006C1.74436 5.18613 2.16454 4.80349 2.66381 4.55511L2.66505 4.5545L10.6628 0.555601L10.665 0.554497C11.0799 0.348361 11.5368 0.241089 12 0.241089C12.4633 0.241089 12.9202 0.348361 13.335 0.554497ZM12 7C12.8284 7 13.5 6.55228 13.5 6C13.5 5.44772 12.8284 5 12 5C11.1716 5 10.5 5.44772 10.5 6C10.5 6.55228 11.1716 7 12 7ZM5 14C5.55228 14 6 14.6716 6 15.5C6 16.3284 5.55228 17 5 17C4.44772 17 4 16.3284 4 15.5C4 14.6716 4.44772 14 5 14ZM10 13.5C10 12.6716 9.55228 12 9 12C8.44771 12 8 12.6716 8 13.5C8 14.3284 8.44771 15 9 15C9.55229 15 10 14.3284 10 13.5ZM15 12C15.5523 12 16 12.6716 16 13.5C16 14.3284 15.5523 15 15 15C14.4477 15 14 14.3284 14 13.5C14 12.6716 14.4477 12 15 12ZM16 17.5C16 16.6716 15.5523 16 15 16C14.4477 16 14 16.6716 14 17.5C14 18.3284 14.4477 19 15 19C15.5523 19 16 18.3284 16 17.5ZM19 14C19.5523 14 20 14.6716 20 15.5C20 16.3284 19.5523 17 19 17C18.4477 17 18 16.3284 18 15.5C18 14.6716 18.4477 14 19 14ZM20 11.5C20 10.6716 19.5523 10 19 10C18.4477 10 18 10.6716 18 11.5C18 12.3284 18.4477 13 19 13C19.5523 13 20 12.3284 20 11.5Z"
      />
    </svg>
  )
}

/**
 * Stamp icon resembling a traditional rubber stamp with a handle.
 */
export function Stamp({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 2C11.1067 2 10 3.06479 10 4.5C10 4.60418 10.0361 4.84751 10.1402 5.27633C10.2383 5.68062 10.3745 6.16394 10.5298 6.71433L10.5359 6.7359C10.8169 7.73189 11.1528 8.92274 11.3584 10.0453C11.5575 11.1322 11.6761 12.3517 11.3626 13.3107L11.1373 14H5C4.44772 14 4 14.4477 4 15V17H21V15C21 14.4477 20.5523 14 20 14H13.8627L13.6374 13.3107C13.3239 12.3517 13.4425 11.1322 13.6416 10.0453C13.8472 8.92275 14.1831 7.7319 14.4641 6.73592L14.4702 6.71433C14.6255 6.16394 14.7617 5.68062 14.8598 5.27633C14.9639 4.84751 15 4.60418 15 4.5C15 3.06479 13.8933 2 12.5 2ZM8 4.5C8 1.93521 10.0273 0 12.5 0C14.9727 0 17 1.93521 17 4.5C17 4.87044 16.9061 5.32522 16.8034 5.74824C16.6956 6.19206 16.5497 6.70936 16.3989 7.24381L16.3951 7.25734C16.1077 8.27611 15.796 9.38378 15.6088 10.4057C15.4919 11.0439 15.4382 11.579 15.4448 12H20C21.6569 12 23 13.3431 23 15V19H2V15C2 13.3431 3.34315 12 5 12H9.55519C9.56179 11.579 9.50808 11.0439 9.39117 10.4057C9.204 9.38378 8.89233 8.27611 8.60494 7.25734L8.60116 7.24398C8.45037 6.70946 8.30442 6.19211 8.19665 5.74824C8.09394 5.32522 8 4.87044 8 4.5ZM21 21V23H4V21H21Z"
      />
    </svg>
  )
}

/**
 * Magic is a sparkle icon used for MagicDNS.
 */
export function Magic({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M6.5 12.5L8.05719 15.9428L11.5 17.5L8.05719 19.0572L6.5 22.5L4.94281 19.0572L1.5 17.5L4.94281 15.9428L6.5 12.5Z"
        fill={color}
      />
      <path
        d="M15.5 1L17.8358 6.16421L23 8.5L17.8358 10.8358L15.5 16L13.1642 10.8358L8 8.5L13.1642 6.16421L15.5 1Z"
        fill={color}
      />
    </svg>
  )
}

export function DragHandle({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13C9.32843 13 10 12.3284 10 11.5C10 10.6716 9.32843 10 8.5 10C7.67157 10 7 10.6716 7 11.5C7 12.3284 7.67157 13 8.5 13ZM10 17.5C10 18.3284 9.32843 19 8.5 19C7.67157 19 7 18.3284 7 17.5C7 16.6716 7.67157 16 8.5 16C9.32843 16 10 16.6716 10 17.5ZM14.5 7C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4C13.6716 4 13 4.67157 13 5.5C13 6.32843 13.6716 7 14.5 7ZM16 11.5C16 12.3284 15.3284 13 14.5 13C13.6716 13 13 12.3284 13 11.5C13 10.6716 13.6716 10 14.5 10C15.3284 10 16 10.6716 16 11.5ZM14.5 19C15.3284 19 16 18.3284 16 17.5C16 16.6716 15.3284 16 14.5 16C13.6716 16 13 16.6716 13 17.5C13 18.3284 13.6716 19 14.5 19Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * Idle is an icon used to communicate that a user is idle.
 */
export function Idle({
  className,
  size = 24,
  color = "currentColor",
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12C1 11.4477 1.44772 11 2 11H9C9.39238 11 9.7485 11.2295 9.91063 11.5868C10.0728 11.9441 10.011 12.3632 9.75258 12.6585L4.20377 19H9C9.55229 19 10 19.4477 10 20C10 20.5523 9.55229 21 9 21H2C1.60762 21 1.2515 20.7705 1.08937 20.4132C0.927231 20.0559 0.989042 19.6368 1.24742 19.3415L6.79623 13H2C1.44772 13 1 12.5523 1 12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5C12 4.44772 12.4477 4 13 4H22C22.3949 4 22.7528 4.23241 22.9135 4.59316C23.0742 4.95391 23.0075 5.37543 22.7433 5.66896L15.2454 14H22C22.5523 14 23 14.4477 23 15C23 15.5523 22.5523 16 22 16H13C12.6051 16 12.2472 15.7676 12.0865 15.4068C11.9258 15.0461 11.9925 14.6246 12.2567 14.331L19.7546 6H13C12.4477 6 12 5.55228 12 5Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * MacOS is an icon for the Apple macOS operating system.
 */
export function MacOS({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5863 12.4671C10.6779 10.8695 11.3597 8.26699 12.8412 5.33301H5.33333C4.59695 5.33301 4 5.92996 4 6.66634V17.333C4 18.0694 4.59695 18.6663 5.33333 18.6663H12.9117C12.7891 17.8747 12.7469 17.0846 12.7501 16.3445C12.451 16.3835 12.1475 16.4046 11.8431 16.4046C10.7679 16.4046 9.702 16.142 8.81073 15.7511C7.92993 15.3648 7.1676 14.8297 6.745 14.2429C6.58904 14.0263 6.63821 13.7242 6.85487 13.5682C7.07147 13.4123 7.37353 13.4614 7.52947 13.6781C7.8128 14.0715 8.40347 14.5169 9.19907 14.8659C9.98427 15.2103 10.9184 15.4379 11.8431 15.4379C12.1563 15.4379 12.4705 15.4118 12.7797 15.3639C12.8241 14.5497 12.9102 13.8379 12.9788 13.3109H11.3921C10.9486 13.3109 10.5589 12.9462 10.5863 12.4671ZM13.7187 16.1537C14.1256 16.0465 14.5149 15.9093 14.8755 15.7511C15.7564 15.3648 16.5187 14.8297 16.9413 14.2429C17.0973 14.0263 17.0481 13.7242 16.8315 13.5682C16.6148 13.4123 16.3127 13.4614 16.1568 13.6781C15.8735 14.0715 15.2829 14.5169 14.4873 14.8659C14.2571 14.9668 14.0142 15.0577 13.7625 15.1357C13.8133 14.3959 13.896 13.7485 13.9598 13.2651C14.0243 12.7757 13.6432 12.3442 13.1518 12.3442H11.564C11.6922 10.8127 12.393 8.2465 13.9289 5.33301H18.6667C19.4031 5.33301 20 5.92996 20 6.66634V17.333C20 18.0694 19.4031 18.6663 18.6667 18.6663H13.8905C13.7466 17.815 13.7059 16.9543 13.7187 16.1537ZM8.33333 8.18301C8.60027 8.18301 8.81667 8.3994 8.81667 8.66634V10.235C8.81667 10.5019 8.60027 10.7183 8.33333 10.7183C8.0664 10.7183 7.85 10.5019 7.85 10.235V8.66634C7.85 8.3994 8.0664 8.18301 8.33333 8.18301ZM16.15 8.66634C16.15 8.3994 15.9336 8.18301 15.6667 8.18301C15.3997 8.18301 15.1833 8.3994 15.1833 8.66634V10.235C15.1833 10.5019 15.3997 10.7183 15.6667 10.7183C15.9336 10.7183 16.15 10.5019 16.15 10.235V8.66634Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * Windows is an icon for the Microsoft Windows operating system.
 */
export function Windows({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path
        d="M4.33334 6.18623L10.6037 5.32854V11.3673H4.33334V6.18623ZM11.3589 5.20951L19.6667 4V11.3166H11.3589V5.20951ZM4.33334 12.0063H10.6037V18.0625L4.33334 17.1874V12.0063ZM11.3589 12.0867H19.6667V19.3333L11.3589 18.1606"
        fill={color}
      />
    </svg>
  )
}

/**
 * IOS is an icon for the Apple iOS operating system.
 */
export function IOS({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5947 4.76129C13.7464 3.24336 15.3475 3.23598 15.3475 3.23598C15.3475 3.23598 15.5856 4.66307 14.4415 6.03783C13.2199 7.50581 11.8313 7.26561 11.8313 7.26561C11.8313 7.26561 11.5706 6.11114 12.5947 4.76129ZM11.9778 8.26527C12.5703 8.26527 13.6699 7.45084 15.1012 7.45084C17.5649 7.45084 18.5342 9.20396 18.5342 9.20396C18.5342 9.20396 16.6385 10.1731 16.6385 12.5248C16.6385 15.1778 19 16.0921 19 16.0921C19 16.0921 17.3492 20.7383 15.1195 20.7383C14.0954 20.7383 13.2993 20.0482 12.2202 20.0482C11.1207 20.0482 10.0295 20.764 9.31875 20.764C7.28272 20.7641 4.71048 16.3567 4.71048 12.8139C4.71048 9.32822 6.88768 7.49967 8.92984 7.49967C10.2574 7.49967 11.2877 8.26527 11.9778 8.26527Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * Android is an icon for the Google Android operating system.
 */
export function Android({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <path
        d="M16.3713 10.3192L17.8709 7.72142C17.9556 7.57579 17.9044 7.39081 17.7607 7.30618C17.6171 7.22158 17.4301 7.27078 17.3474 7.41639L15.8282 10.0476C14.669 9.51818 13.3643 9.22298 11.9611 9.22298C10.558 9.22298 9.25318 9.51818 8.09403 10.0476L6.57477 7.41639C6.49015 7.27076 6.30516 7.22157 6.15953 7.30618C6.0139 7.39079 5.9647 7.57579 6.04932 7.72142L7.54893 10.3192C4.963 11.7203 3.2115 14.3377 2.92221 17.4019H21C20.7107 14.3377 18.9592 11.7203 16.3713 10.3192ZM7.81064 14.8632C7.39148 14.8632 7.05299 14.5227 7.05299 14.1055C7.05299 13.6864 7.39346 13.3478 7.81064 13.3478C8.22986 13.3478 8.56835 13.6883 8.56835 14.1055C8.57039 14.5227 8.22986 14.8632 7.81064 14.8632ZM16.1096 14.8632C15.6904 14.8632 15.3519 14.5227 15.3519 14.1055C15.3519 13.6864 15.6924 13.3478 16.1096 13.3478C16.5288 13.3478 16.8673 13.6883 16.8673 14.1055C16.8693 14.5227 16.5288 14.8632 16.1096 14.8632Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * DevicePlus is an icon used for adding devices
 */
export function DevicePlus({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...rest}
    >
      <path
        d="M10.8337 2.5H3.33366C2.89163 2.5 2.46771 2.67559 2.15515 2.98816C1.84259 3.30072 1.66699 3.72464 1.66699 4.16667V12.5C1.66699 12.942 1.84259 13.366 2.15515 13.6785C2.46771 13.9911 2.89163 14.1667 3.33366 14.1667H16.667C17.109 14.1667 17.5329 13.9911 17.8455 13.6785C18.1581 13.366 18.3337 12.942 18.3337 12.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66699 17.5H13.3337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.1667V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3037 4.58324H19.1963"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2793 1.66664V7.55919"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * AppConnector is an icon used to represent application connections or integrations.
 */
export function AppConnector({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 44"
      fill="none"
      {...rest}
    >
      <path
        d="M15.9985 22.0001H1.99854"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M26.0015 22H34.0015"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M13.8452 14.0001V7.44152C13.8452 6.58066 14.3961 5.81638 15.2128 5.54415L23.2128 2.87749C24.5078 2.4458 25.8452 3.40974 25.8452 4.77485V14.0004V30.0004V39.2252C25.8452 40.5903 24.5079 41.5543 23.2128 41.1226L15.2128 38.4562C14.3961 38.184 13.8452 37.4197 13.8452 36.5588V30.0003"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="34.0015"
        y="16"
        width="12"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  )
}

/**
 * CloudCheck is an icon used to represent cloud services with a checkmark, indicating successful operations or confirmations.
 */
export function CloudCheck({
  className,
  size = 24,
  color = "currentColor",
  label,
  ...rest
}: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="m17 15-5.5 5.5L9 18" />
      <path d="M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742" />
    </svg>
  )
}
