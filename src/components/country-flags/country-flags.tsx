import React from "react"

/**
 * CountryFlag displays the flag of defined countries.
 * The current defined countries match Stripes supported
 * tax ID countries.
 * Both full country and 2 digit ISO code are accepted.
 */
export function CountryFlag(props: { country: string; className?: string }) {
  const { country, className } = props
  const v = lookup(country)
  return (
    <span title={v.name} className={className}>
      {v.emoji}
    </span>
  )
}

/**
 * emoji returns the emoji flag for the country c.
 * @param c a 2 digit ISO country code or its name.
 * @returns
 */
export function emoji(c: string): string {
  return lookup(c).emoji
}

type Country = {
  name: string
  code: string
  emoji: string
}

let index: Map<string, Country>

function lookup(c: string): Country {
  // Lazily instantiate the index.
  if (!index) {
    index = new Map(
      countryList
        .map(([name, code, emoji]) => {
          return {
            name,
            code,
            emoji,
          }
        })
        .flatMap((v) => [
          [v.name.toLowerCase(), v],
          [v.code, v],
        ])
    )
    // In tax codes, XI is used to represent goods from Northern Ireland within
    // the UK; and XU from Scotland, Wales and England otherwise.
    index.set("xi", {
      name: "United Kingdom (North Ireland)",
      code: "xi",
      emoji: "🇬🇧",
    })
    index.set("xu", {
      name: "United Kingdom (Scotland, England, Wales)",
      code: "xu",
      emoji: "🇬🇧",
    })
  }

  // Return the country.
  const v = index.get(c.toLowerCase())
  if (v) return v
  return { name: c, code: c, emoji: "🌏" }
}

// list built from https://runkit.com/651174d862b4910008bd70a0/651174d83b47050008bf8a89:
// console.log(JSON.stringify(require("emoji-flags").data.map(c => [c.name.toLowerCase(), c.code.toLowerCase(), c.emoji])))
export const countryList = [
  ["Andorra", "ad", "🇦🇩"],
  ["United Arab Emirates", "ae", "🇦🇪"],
  ["Afghanistan", "af", "🇦🇫"],
  ["Antigua and Barbuda", "ag", "🇦🇬"],
  ["Anguilla", "ai", "🇦🇮"],
  ["Albania", "al", "🇦🇱"],
  ["Armenia", "am", "🇦🇲"],
  ["Angola", "ao", "🇦🇴"],
  ["Antarctica", "aq", "🇦🇶"],
  ["Argentina", "ar", "🇦🇷"],
  ["American Samoa", "as", "🇦🇸"],
  ["Austria", "at", "🇦🇹"],
  ["Australia", "au", "🇦🇺"],
  ["Aruba", "aw", "🇦🇼"],
  ["Åland Islands", "ax", "🇦🇽"],
  ["Azerbaijan", "az", "🇦🇿"],
  ["Bosnia and Herzegovina", "ba", "🇧🇦"],
  ["Barbados", "bb", "🇧🇧"],
  ["Bangladesh", "bd", "🇧🇩"],
  ["Belgium", "be", "🇧🇪"],
  ["Burkina Faso", "bf", "🇧🇫"],
  ["Bulgaria", "bg", "🇧🇬"],
  ["Bahrain", "bh", "🇧🇭"],
  ["Burundi", "bi", "🇧🇮"],
  ["Benin", "bj", "🇧🇯"],
  ["Saint Barthélemy", "bl", "🇧🇱"],
  ["Bermuda", "bm", "🇧🇲"],
  ["Brunei Darussalam", "bn", "🇧🇳"],
  ["Bolivia", "bo", "🇧🇴"],
  ["Bonaire, Sint Eustatius and Saba", "bq", "🇧🇶"],
  ["Brazil", "br", "🇧🇷"],
  ["Bahamas", "bs", "🇧🇸"],
  ["Bhutan", "bt", "🇧🇹"],
  ["Bouvet Island", "bv", "🇧🇻"],
  ["Botswana", "bw", "🇧🇼"],
  ["Belarus", "by", "🇧🇾"],
  ["Belize", "bz", "🇧🇿"],
  ["Canada", "ca", "🇨🇦"],
  ["Cocos (Keeling) Islands", "cc", "🇨🇨"],
  ["Congo", "cd", "🇨🇩"],
  ["Central African Republic", "cf", "🇨🇫"],
  ["Congo", "cg", "🇨🇬"],
  ["Switzerland", "ch", "🇨🇭"],
  ["Côte D’Ivoire", "ci", "🇨🇮"],
  ["Cook Islands", "ck", "🇨🇰"],
  ["Chile", "cl", "🇨🇱"],
  ["Cameroon", "cm", "🇨🇲"],
  ["China", "cn", "🇨🇳"],
  ["Colombia", "co", "🇨🇴"],
  ["Costa Rica", "cr", "🇨🇷"],
  ["Cuba", "cu", "🇨🇺"],
  ["Cape Verde", "cv", "🇨🇻"],
  ["Curaçao", "cw", "🇨🇼"],
  ["Christmas Island", "cx", "🇨🇽"],
  ["Cyprus", "cy", "🇨🇾"],
  ["Czech Republic", "cz", "🇨🇿"],
  ["Germany", "de", "🇩🇪"],
  ["Djibouti", "dj", "🇩🇯"],
  ["Denmark", "dk", "🇩🇰"],
  ["Dominica", "dm", "🇩🇲"],
  ["Dominican Republic", "do", "🇩🇴"],
  ["Algeria", "dz", "🇩🇿"],
  ["Ecuador", "ec", "🇪🇨"],
  ["Estonia", "ee", "🇪🇪"],
  ["Egypt", "eg", "🇪🇬"],
  ["Western Sahara", "eh", "🇪🇭"],
  ["Eritrea", "er", "🇪🇷"],
  ["Spain", "es", "🇪🇸"],
  ["Ethiopia", "et", "🇪🇹"],
  ["European Union", "eu", "🇪🇺"],
  ["Finland", "fi", "🇫🇮"],
  ["Fiji", "fj", "🇫🇯"],
  ["Falkland Islands (Malvinas)", "fk", "🇫🇰"],
  ["Micronesia", "fm", "🇫🇲"],
  ["Faroe Islands", "fo", "🇫🇴"],
  ["France", "fr", "🇫🇷"],
  ["Gabon", "ga", "🇬🇦"],
  ["United Kingdom", "gb", "🇬🇧"],
  ["Grenada", "gd", "🇬🇩"],
  ["Georgia", "ge", "🇬🇪"],
  ["French Guiana", "gf", "🇬🇫"],
  ["Guernsey", "gg", "🇬🇬"],
  ["Ghana", "gh", "🇬🇭"],
  ["Gibraltar", "gi", "🇬🇮"],
  ["Greenland", "gl", "🇬🇱"],
  ["Gambia", "gm", "🇬🇲"],
  ["Guinea", "gn", "🇬🇳"],
  ["Guadeloupe", "gp", "🇬🇵"],
  ["Equatorial Guinea", "gq", "🇬🇶"],
  ["Greece", "gr", "🇬🇷"],
  ["South Georgia", "gs", "🇬🇸"],
  ["Guatemala", "gt", "🇬🇹"],
  ["Guam", "gu", "🇬🇺"],
  ["Guinea-Bissau", "gw", "🇬🇼"],
  ["Guyana", "gy", "🇬🇾"],
  ["Hong Kong", "hk", "🇭🇰"],
  ["Heard Island and Mcdonald Islands", "hm", "🇭🇲"],
  ["Honduras", "hn", "🇭🇳"],
  ["Croatia", "hr", "🇭🇷"],
  ["Haiti", "ht", "🇭🇹"],
  ["Hungary", "hu", "🇭🇺"],
  ["Indonesia", "id", "🇮🇩"],
  ["Ireland", "ie", "🇮🇪"],
  ["Israel", "il", "🇮🇱"],
  ["Isle of Man", "im", "🇮🇲"],
  ["India", "in", "🇮🇳"],
  ["British Indian Ocean Territory", "io", "🇮🇴"],
  ["Iraq", "iq", "🇮🇶"],
  ["Iran", "ir", "🇮🇷"],
  ["Iceland", "is", "🇮🇸"],
  ["Italy", "it", "🇮🇹"],
  ["Jersey", "je", "🇯🇪"],
  ["Jamaica", "jm", "🇯🇲"],
  ["Jordan", "jo", "🇯🇴"],
  ["Japan", "jp", "🇯🇵"],
  ["Kenya", "ke", "🇰🇪"],
  ["Kyrgyzstan", "kg", "🇰🇬"],
  ["Cambodia", "kh", "🇰🇭"],
  ["Kiribati", "ki", "🇰🇮"],
  ["Comoros", "km", "🇰🇲"],
  ["Saint Kitts and Nevis", "kn", "🇰🇳"],
  ["North Korea", "kp", "🇰🇵"],
  ["South Korea", "kr", "🇰🇷"],
  ["Kuwait", "kw", "🇰🇼"],
  ["Cayman Islands", "ky", "🇰🇾"],
  ["Kazakhstan", "kz", "🇰🇿"],
  ["Lao People’s Democratic Republic", "la", "🇱🇦"],
  ["Lebanon", "lb", "🇱🇧"],
  ["Saint Lucia", "lc", "🇱🇨"],
  ["Liechtenstein", "li", "🇱🇮"],
  ["Sri Lanka", "lk", "🇱🇰"],
  ["Liberia", "lr", "🇱🇷"],
  ["Lesotho", "ls", "🇱🇸"],
  ["Lithuania", "lt", "🇱🇹"],
  ["Luxembourg", "lu", "🇱🇺"],
  ["Latvia", "lv", "🇱🇻"],
  ["Libya", "ly", "🇱🇾"],
  ["Morocco", "ma", "🇲🇦"],
  ["Monaco", "mc", "🇲🇨"],
  ["Moldova", "md", "🇲🇩"],
  ["Montenegro", "me", "🇲🇪"],
  ["Saint Martin (French Part)", "mf", "🇲🇫"],
  ["Madagascar", "mg", "🇲🇬"],
  ["Marshall Islands", "mh", "🇲🇭"],
  ["Macedonia", "mk", "🇲🇰"],
  ["Mali", "ml", "🇲🇱"],
  ["Myanmar", "mm", "🇲🇲"],
  ["Mongolia", "mn", "🇲🇳"],
  ["Macao", "mo", "🇲🇴"],
  ["Northern Mariana Islands", "mp", "🇲🇵"],
  ["Martinique", "mq", "🇲🇶"],
  ["Mauritania", "mr", "🇲🇷"],
  ["Montserrat", "ms", "🇲🇸"],
  ["Malta", "mt", "🇲🇹"],
  ["Mauritius", "mu", "🇲🇺"],
  ["Maldives", "mv", "🇲🇻"],
  ["Malawi", "mw", "🇲🇼"],
  ["Mexico", "mx", "🇲🇽"],
  ["Malaysia", "my", "🇲🇾"],
  ["Mozambique", "mz", "🇲🇿"],
  ["Namibia", "na", "🇳🇦"],
  ["New Caledonia", "nc", "🇳🇨"],
  ["Niger", "ne", "🇳🇪"],
  ["Norfolk Island", "nf", "🇳🇫"],
  ["Nigeria", "ng", "🇳🇬"],
  ["Nicaragua", "ni", "🇳🇮"],
  ["Netherlands", "nl", "🇳🇱"],
  ["Norway", "no", "🇳🇴"],
  ["Nepal", "np", "🇳🇵"],
  ["Nauru", "nr", "🇳🇷"],
  ["Niue", "nu", "🇳🇺"],
  ["New Zealand", "nz", "🇳🇿"],
  ["Oman", "om", "🇴🇲"],
  ["Panama", "pa", "🇵🇦"],
  ["Peru", "pe", "🇵🇪"],
  ["French Polynesia", "pf", "🇵🇫"],
  ["Papua New Guinea", "pg", "🇵🇬"],
  ["Philippines", "ph", "🇵🇭"],
  ["Pakistan", "pk", "🇵🇰"],
  ["Poland", "pl", "🇵🇱"],
  ["Saint Pierre and Miquelon", "pm", "🇵🇲"],
  ["Pitcairn", "pn", "🇵🇳"],
  ["Puerto Rico", "pr", "🇵🇷"],
  ["Palestinian Territory", "ps", "🇵🇸"],
  ["Portugal", "pt", "🇵🇹"],
  ["Palau", "pw", "🇵🇼"],
  ["Paraguay", "py", "🇵🇾"],
  ["Qatar", "qa", "🇶🇦"],
  ["Réunion", "re", "🇷🇪"],
  ["Romania", "ro", "🇷🇴"],
  ["Serbia", "rs", "🇷🇸"],
  ["Russia", "ru", "🇷🇺"],
  ["Rwanda", "rw", "🇷🇼"],
  ["Saudi Arabia", "sa", "🇸🇦"],
  ["Solomon Islands", "sb", "🇸🇧"],
  ["Seychelles", "sc", "🇸🇨"],
  ["Sudan", "sd", "🇸🇩"],
  ["Sweden", "se", "🇸🇪"],
  ["Singapore", "sg", "🇸🇬"],
  ["Saint Helena, Ascension and Tristan Da Cunha", "sh", "🇸🇭"],
  ["Slovenia", "si", "🇸🇮"],
  ["Svalbard and Jan Mayen", "sj", "🇸🇯"],
  ["Slovakia", "sk", "🇸🇰"],
  ["Sierra Leone", "sl", "🇸🇱"],
  ["San Marino", "sm", "🇸🇲"],
  ["Senegal", "sn", "🇸🇳"],
  ["Somalia", "so", "🇸🇴"],
  ["Suriname", "sr", "🇸🇷"],
  ["South Sudan", "ss", "🇸🇸"],
  ["Sao Tome and Principe", "st", "🇸🇹"],
  ["El Salvador", "sv", "🇸🇻"],
  ["Sint Maarten (Dutch Part)", "sx", "🇸🇽"],
  ["Syrian Arab Republic", "sy", "🇸🇾"],
  ["Swaziland", "sz", "🇸🇿"],
  ["Turks and Caicos Islands", "tc", "🇹🇨"],
  ["Chad", "td", "🇹🇩"],
  ["French Southern Territories", "tf", "🇹🇫"],
  ["Togo", "tg", "🇹🇬"],
  ["Thailand", "th", "🇹🇭"],
  ["Tajikistan", "tj", "🇹🇯"],
  ["Tokelau", "tk", "🇹🇰"],
  ["Timor-Leste", "tl", "🇹🇱"],
  ["Turkmenistan", "tm", "🇹🇲"],
  ["Tunisia", "tn", "🇹🇳"],
  ["Tonga", "to", "🇹🇴"],
  ["Turkey", "tr", "🇹🇷"],
  ["Trinidad and Tobago", "tt", "🇹🇹"],
  ["Tuvalu", "tv", "🇹🇻"],
  ["Taiwan", "tw", "🇹🇼"],
  ["Tanzania", "tz", "🇹🇿"],
  ["Ukraine", "ua", "🇺🇦"],
  ["Uganda", "ug", "🇺🇬"],
  ["United States Minor Outlying Islands", "um", "🇺🇲"],
  ["United States", "us", "🇺🇸"],
  ["Uruguay", "uy", "🇺🇾"],
  ["Uzbekistan", "uz", "🇺🇿"],
  ["Vatican City", "va", "🇻🇦"],
  ["Saint Vincent and The Grenadines", "vc", "🇻🇨"],
  ["Venezuela", "ve", "🇻🇪"],
  ["Virgin Islands, British", "vg", "🇻🇬"],
  ["Virgin Islands, U.S.", "vi", "🇻🇮"],
  ["Viet Nam", "vn", "🇻🇳"],
  ["Vanuatu", "vu", "🇻🇺"],
  ["Wallis and Futuna", "wf", "🇼🇫"],
  ["Samoa", "ws", "🇼🇸"],
  ["Kosovo", "xk", "🇽🇰"],
  ["Yemen", "ye", "🇾🇪"],
  ["Mayotte", "yt", "🇾🇹"],
  ["South Africa", "za", "🇿🇦"],
  ["Zambia", "zm", "🇿🇲"],
  ["Zimbabwe", "zw", "🇿🇼"],
]
