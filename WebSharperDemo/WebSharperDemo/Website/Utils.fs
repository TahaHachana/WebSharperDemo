namespace Website

module Utils =

    open IntelliFactory.Html

    module Server =

        let makeLi activeLiOption href txt =
            match activeLiOption with
                | None          -> LI [A [HRef href] -< [Text txt]]
                | Some activeLi ->
                    if txt = activeLi then LI [Class "active"] -< [A [HRef href] -< [Text txt]]
                    else LI [A [HRef href] -< [Text txt]]

        let navigation activeLiOption =
            let makeLi' = makeLi activeLiOption
            Div [Class "navbar navbar-inverse navbar-fixed-top"; Id "navigation"] -< [
                Div [Class "navbar-inner"] -< [
                    Div [Class "container"] -< [UL [Class "nav"] -< [makeLi' "/" "Home"]]
                ]
            ]