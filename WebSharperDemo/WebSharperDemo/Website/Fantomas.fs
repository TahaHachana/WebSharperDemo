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

    module private Server =

        [<Rpc>]
        let format src config =
            async {
                try
                    let config' = toFormatConfig config
                    let code = CodeFormatter.formatSourceString false src config'
                    return code
                with _ -> return ""
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

        let config =
            Div [Attr.Style "position: fixed; top: 45px; right: 200px; background-color: white; border: 1px solid;"] -< [
                Div [Attr.Style "font-weight: bold; background-color: black; color: white; padding: 10px; cursor: pointer;"] -< [Text "Config"]
                |>! OnClick (fun elt _ ->
                    do JQuery.Of("#form").Toggle().Ignore)
                Div [Id "form"; Attr.Style "display: none; margin: 10px; width: 300px;"] -< [
                    Form [
                        FieldSet [
                            Legend [Text "Formatting Configuration"]
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
            let textArea = TextArea [Attr.Style "width: 450px; height: 600px; overflow: scroll; word-wrap: normal;"]
            let textArea' = TextArea [Attr.Style "width: 450px; height: 600px; overflow: scroll; word-wrap: normal;"]
            let btn =
                Button [Attr.Class "span2 btn btn-primary"; Attr.Style "width: 100px; height: 40px; margin-top: 200px;"] -- Text "Format"
                |>! OnClick (fun elt _ ->
                    async {
                        elt.SetAttribute("disabled", "disabled")
//                        let loaderJquery = JQuery.Of("#loader")
//                        loaderJquery.Css("visibility", "visible").Ignore
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
                        let! code = Server.format textArea.Value config
                        textArea'.Value <- code
//                        loaderJquery.Css("visibility", "hidden").Ignore
                        elt.RemoveAttribute("disabled")
                    } |> Async.Start)

            Div [
                config
                Div [Attr.Class "row"] -< [
                    Div [Attr.Class "span5"] -< [
                        H3 [Text "F# Code"]
                        textArea
                    ]
//                    Div [Attr.Class "span2"] -< [
                    btn
//                        Div [] -< [Img [Src "Images/Crawler/Loader.gif"; Attr.Class "loader"; Id "loader"]]
//                    ]
                    Div [Attr.Class "span5"] -< [
                        H3 [Text "Formatted Output"]
                        textArea'
                    ]
                ]
            ]

    type Control() =
        
        inherit Web.Control()

        [<JavaScript>]
        override __.Body = Client.main() :> _