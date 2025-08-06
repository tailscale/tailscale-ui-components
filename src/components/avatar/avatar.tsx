import cx from "classnames"
import React, { HTMLAttributes } from "react"
import { Users } from "src/icons"

export type UserAvatarProps = {
  id?: string
  displayName?: string
  profilePicURL?: string
  loginName: string
}

type Props = {
  /**
   * The user the avatar is for.
   */
  user?: UserAvatarProps
  /**
   * The group name the avatar is for.
   * The `user` prop takes precidence over this value.
   * i.e. `group` is only used when `user` is not filled.
   * If neither user nor group is filled, an empty avatar is returned.
   */
  group?: string
  /**
   * Size is an integer that represents a utility class value (w-8, w-16, etc.)
   * Accepts a single value, or an object of sizes. Unfortunately, it also
   * includes some type size details in order to properly size the letter for
   * the default avatar.
   */
  sizeClassName: string
} & HTMLAttributes<HTMLDivElement>

/**
 * Avatar is a standard component which shows a users avatar as a circle.
 * Size is controlled with the `sizeClassName` prop.
 * For example:
 *
 *     <Avatar user={user} sizeClassName="w-12 h-12 text-md" />
 *
 * Or with responsive styles
 *
 *     <Avatar user={user} sizeClassName="w-8 md:w-12 h-8 md:h-8 text-md" />
 *
 * If the user has no avatar, it falls back to the first letter of their user
 * name with a colored background. If no user is provided, it falls back to a
 * circle with a dotted border (with whatever children specified).
 */
export default function Avatar(props: Props) {
  const { className, sizeClassName, user, group, children, ...rest } = props
  const hasAvatar = user && user.profilePicURL && user.profilePicURL.length > 0

  return (
    <div
      className={cx(
        "relative shrink-0 rounded-full overflow-hidden transition-all duration-300",
        sizeClassName,
        className
      )}
      {...rest}
    >
      {user ? (
        hasAvatar ? (
          <>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${user.profilePicURL})` }}
            ></div>
            <div className="absolute inset-0 w-full h-full rounded-full"></div>
          </>
        ) : (
          <div
            className={cx(colorBackgroundClassname, sizeClassName)}
            style={{
              backgroundColor: getBackgroundColor(user.id || user.loginName),
            }}
          >
            {(user.displayName || user.loginName || "-").slice(0, 1)}
          </div>
        )
      ) : group ? (
        <div
          className={cx(colorBackgroundClassname, sizeClassName)}
          style={{ backgroundColor: getBackgroundColor(group) }}
        >
          <Users color="white" size="60%" />
        </div>
      ) : (
        <div
          className={cx(
            "flex justify-center items-center pointer-events-none rounded-full border border-border-interactive border-dashed",
            sizeClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

const colorBackgroundClassname =
  "flex items-center justify-center text-center capitalize text-white font-medium pointer-events-none transition-all duration-300"

const colors = [
  "#cca000",
  "#ca6940",
  "#0d4b3b",
  "#a13821",
  "#496495",
  "#762B0B",
  "#0E6245",
  "#C44C34",
  "#3F5DB3",
  "#324994",
  "#19224A",
  "#2C2929",
  "#0E6245",
  "#09825D",
  "#BB5504",
]

function getBackgroundColor(userId: string) {
  // Simple hash function that is also implemented in native clients that
  // show avatars (e.g. Avatar.swift).
  const hashCode = userId
    .split("")
    .reduce((prevHash, currVal) => prevHash ^ (currVal.codePointAt(0) ?? 0), 0)

  return colors[Math.abs(hashCode) % colors.length]
}

Avatar.defaultProps = {
  sizeClassName: "w-12 h-12 text-md",
}
