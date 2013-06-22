namespace Website

open IntelliFactory.WebSharper
open Fantomas
open Fantomas.FormatConfig

module Fantomas =

    type private Config =
        {
            IndentSpaceNum : string
            PageWidth : string
            SemicolonAtEndOfLine : bool
            SpaceBeforeArgument : bool
            SpaceBeforeColon : bool
            SpaceAfterComma : bool
            SpaceAfterSemicolon : bool
            IndentOnTryWith : bool
        }

    let private toFormatConfig (config : Config) =
        { FormatConfig.Default with
            IndentSpaceNum = Num.Parse config.IndentSpaceNum
            PageWidth = Num.Parse config.PageWidth
            SemicolonAtEndOfLine = config.SemicolonAtEndOfLine
            SpaceBeforeArgument = config.SpaceBeforeArgument
            SpaceBeforeColon = config.SpaceBeforeColon
            SpaceAfterComma = config.SpaceAfterComma
            SpaceAfterSemicolon = config.SpaceAfterSemicolon
            IndentOnTryWith= config.IndentOnTryWith
        }

    type Result = Failure | Success of string

    module private Server =

        [<Rpc>]
        let format src config =
            async {
                try
                    let config' = toFormatConfig config
                    let code = CodeFormatter.formatSourceString false src config'
                    return Success code
                with _ -> return Failure
            }

    [<JavaScript>]
    module private Client =
        
        open IntelliFactory.WebSharper.Html
        open IntelliFactory.WebSharper.JQuery
        open IntelliFactory.WebSharper.Formlet

        let indentSpaceNum =
            Select[]
            |>! OnAfterRender (fun elt ->
                elt.Html <-
                    "<select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option selected='selected'>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>")
        let pageWidth = Input [Attr.Value "80"]
        let semicolonAtEndOfLine = Input [Attr.Type "checkbox"; Attr.Checked "checked"]
        let spaceBeforeArgument = Input [Attr.Type "checkbox"]
        let spaceBeforeColon = Input [Attr.Type "checkbox"; Attr.Checked "checked"]
        let spaceAfterComma = Input [Attr.Type "checkbox"; Attr.Checked "checked"]
        let spaceAfterSemicolon = Input [Attr.Type "checkbox"; Attr.Checked "checked"]
        let indentOnTryWith = Input [Attr.Type "checkbox"]

        let displayAlert success =
            let ajq = JQuery.Of("#alert")
            let pjq = JQuery.Of("#msg")
            match success with
                | false -> ajq.RemoveClass("alert-success").Text("Formatting the code failed.").Ignore
                | true  -> ajq.AddClass("alert-success").Text("Code formatted successfully.").Ignore
            ajq.FadeIn().Ignore
            ajq.FadeOut(5000.).Ignore

        let alert = Div [Id "alert"; Attr.Style "position: fixed; top: 40px; display: none;"; Attr.Class "offset4 span4 alert text-center"]

        let config =
            Div [Attr.Style "position: fixed; top: 45px; right: 200px; background-color: white; border: 1px solid;"] -< [
                Div [Attr.Style "font-weight: bold; background-color: black; color: white; padding: 10px; cursor: pointer;"] -< [Text "Config"]
                |>! OnClick (fun elt _ ->
                    do JQuery.Of("#form").Toggle().Ignore)
                Div [Id "form"; Attr.Style "display: none; margin: 10px; width: 300px;"] -< [
                    Form [
                        FieldSet [
                            Legend [Text "Formatting Configuration"]
                            Label [Text "Indentation"]
                            indentSpaceNum
                            Label [Text "Page width"]
                            pageWidth
                            Hr []
                            Label [Attr.Class "checkbox"] -< [
                                semicolonAtEndOfLine :> IPagelet
                                Text "Semicolon at end of line"
                            ]
                            Label [Attr.Class "checkbox"] -< [
                                spaceBeforeArgument :> IPagelet
                                Text "Space before argument"
                            ]
                            Label [Attr.Class "checkbox"] -< [
                                spaceBeforeColon :> IPagelet
                                Text "Space before colon"
                            ]
                            Label [Attr.Class "checkbox"] -< [
                                spaceAfterComma :> IPagelet
                                Text "Space after comma"
                            ]
                            Label [Attr.Class "checkbox"] -< [
                                spaceAfterSemicolon :> IPagelet
                                Text "Space after semicolon"
                            ]
                            Label [Attr.Class "checkbox"] -< [
                                indentOnTryWith :> IPagelet
                                Text "Indent on try with"
                            ]
                        ]
                    ]
                ]
            ]
                    
        let main() =
            let textArea = TextArea [Attr.Style "overflow: scroll; word-wrap: normal; height: 300px;"; Attr.Class "span12"]
            let textArea' = TextArea [Attr.Style "overflow: scroll; word-wrap: normal; height: 300px;"; Attr.Class "span12"]
            let formatBtn =
                Button [Attr.Class "btn btn-primary btn-large"; Attr.Style "float: left;"] -- Text "Format"
                |>! OnClick (fun elt _ ->
                    async {
                        elt.SetAttribute("disabled", "disabled")
                        let loaderJquery = JQuery.Of("#loader")
                        loaderJquery.Css("visibility", "visible").Ignore
                        let config =
                            {
                                IndentSpaceNum = indentSpaceNum.Value
                                PageWidth = pageWidth.Value
                                SemicolonAtEndOfLine = semicolonAtEndOfLine.HasAttribute("checked")
                                SpaceBeforeArgument = spaceBeforeArgument.HasAttribute("checked")
                                SpaceBeforeColon = spaceBeforeColon.HasAttribute("checked")
                                SpaceAfterComma = spaceAfterComma.HasAttribute("checked")
                                SpaceAfterSemicolon = spaceAfterSemicolon.HasAttribute("checked")
                                IndentOnTryWith = indentOnTryWith.HasAttribute("checked")
                            }
                        textArea'.Value <- ""
                        let! result = Server.format textArea.Value config
                        match result with
                            | Failure      -> displayAlert false
                            | Success code ->
                                textArea'.Value <- code
                                displayAlert true
                        loaderJquery.Css("visibility", "hidden").Ignore
                        elt.RemoveAttribute("disabled")
                    } |> Async.Start)
            Div [
                alert
                config
                H3 [Text "F# Code"]
                textArea
                Div [
                    formatBtn
                    Div [Img [Attr.Style "padding: 10px; visibility: hidden;"; Src "Images/Crawler/Loader.gif"; Id "loader"]]
                ]
                Div [Attr.Class ""] -< [
                    Div [Attr.Class "tabbable"] -< [
                        UL [Attr.Class "nav nav-tabs"] -< [
                            LI [Attr.Class "active"] -< [A [HRef "#output"; HTML5.Attr.Data "toggle" "tab"] -< [Text "Output"]]
                            LI [A [HRef "#html"; HTML5.Attr.Data "toggle" "tab"] -< [Text "HTML"]]
                            LI [A [HRef "#html-preview"; HTML5.Attr.Data "toggle" "tab"] -< [Text "HTML Preview"]]
                        ]
                        Div [Attr.Class "tab-content"] -< [
                            Div [Attr.Class "tab-pane active"; Id "output"] -< [textArea']
                            Div [Attr.Class "tab-pane"; Id "html"] -< []
                            Div [Attr.Class "tab-pane"; Id "html-preview"] -< []
                        ]
                    ]
                ]
            ]

    type Control() =
        
        inherit Web.Control()

        [<JavaScript>]
        override __.Body = Client.main() :> _