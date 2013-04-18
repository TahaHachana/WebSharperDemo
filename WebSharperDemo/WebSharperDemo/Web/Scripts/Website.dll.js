(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Website,Crawler,Client,jQuery,WebSharper,Arrays,Html,Default,List,HTML5,EventsPervasives,Remoting,alert,Concurrency,Formlet,Formlet1,Enhance,Data,Operators,Fantomas,Client1,T,Forkme,Geolocation,google,Unchecked,Strings,window,Html5Logo,Client2,Seq,Slideshow,setInterval,RegExp,Twitter,Client3,String;
 Runtime.Define(Global,{
  Website:{
   Crawler:{
    Client:{
     Viewer:Runtime.Class({
      get_Body:function()
      {
       return Client.urlForm();
      }
     }),
     appendTd:function(text,tableRow)
     {
      return jQuery("<td/>").text(text).appendTo(tableRow);
     },
     clearTable:function()
     {
      return Client.removeRows("#table tr");
     },
     displayData:function(data,selector)
     {
      var x,f,mapping,f1,action;
      x=(f=(mapping=Runtime.Tupled(function(tupledArg)
      {
       var x1,y,z;
       x1=tupledArg[0];
       y=tupledArg[1];
       z=tupledArg[2];
       return Client.tableRow(x1,y,z);
      }),function(array)
      {
       return Arrays.map(mapping,array);
      }),f(data));
      f1=(action=function(x1)
      {
       return x1.appendTo(jQuery(selector));
      },function(array)
      {
       return Arrays.iter(action,array);
      });
      return f1(x);
     },
     removeRows:function(selector)
     {
      return jQuery(selector).each(function(idx)
      {
       if(idx===0)
        {
         return null;
        }
       else
        {
         return jQuery(this).remove();
        }
      });
     },
     tableRow:function(requestUri,statusCode,contentType)
     {
      var tr;
      tr=jQuery("<tr/>");
      Client.appendTd(requestUri,tr);
      Client.appendTd(statusCode,tr);
      Client.appendTd(contentType,tr);
      return tr;
     },
     urlForm:function()
     {
      var urlInput,x,_this,f,x1,submitBtn,x2,f1,x3,urlInputFormlet,x6,f5,submitBtnFormlet,form,x7,x8,f6;
      urlInput=(x=Default.Input(List.ofArray([Default.Id("seed"),(_this=HTML5.Attr(),_this.NewAttr("autofocus","autofocus"))])),(f=(x1=function()
      {
       return function(key)
       {
        var _key_;
        _key_=key.KeyCode;
        if(_key_===13)
         {
          return jQuery("#submitButton").click();
         }
        else
         {
          return null;
         }
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnKeyDown(x1,arg10);
      }),(f(x),x)));
      submitBtn=(x2=Default.Button(List.ofArray([Default.Text("Submit"),Default.Id("submitButton"),Default.Attr().Class("btn btn-primary")])),(f1=(x3=function()
      {
       return function()
       {
        var x4,f2,f4;
        x4=(f2=function()
        {
         var url,loaderJquery,x5,f3;
         Client.clearTable();
         url=urlInput.get_Value();
         loaderJquery=jQuery("#loader");
         loaderJquery.css("visibility","visible");
         x5=Remoting.Async("Website:0",[url]);
         f3=function(_arg1)
         {
          var data,matchValue;
          loaderJquery.css("visibility","hidden");
          if(_arg1.$==1)
           {
            data=_arg1.$0;
            matchValue=data.length;
            if(matchValue===0)
             {
              alert("Crawling failed, check the provided URL.");
              return Concurrency.Return(null);
             }
            else
             {
              Client.displayData(data,"#table");
              return Concurrency.Return(null);
             }
           }
          else
           {
            alert("The URL is not valid.");
            return Concurrency.Return(null);
           }
         };
         return Concurrency.Bind(x5,f3);
        },Concurrency.Delay(f2));
        f4=function(arg00)
        {
         var t;
         t={
          $:0
         };
         return Concurrency.Start(arg00);
        };
        return f4(x4);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x3,arg10);
      }),(f1(x2),x2)));
      urlInputFormlet=(x6=Formlet1.OfElement(function()
      {
       return urlInput;
      }),(f5=function(formlet)
      {
       return Enhance.WithTextLabel("URL:",formlet);
      },f5(x6)));
      submitBtnFormlet=Formlet1.OfElement(function()
      {
       return submitBtn;
      });
      form=(x7=Data.$(Data.$((x8=function()
      {
       return function()
       {
        return null;
       };
      },Formlet1.Return(x8)),urlInputFormlet),submitBtnFormlet),(f6=function(formlet)
      {
       return Enhance.WithFormContainer(formlet);
      },f6(x7)));
      return Formlet1.Run(function()
      {
       return null;
      },form);
     }
    }
   },
   Fantomas:{
    Client:{
     config:Runtime.Field(function()
     {
      var _this,x,_this1,f,x1,_this2,x2,x3,_this3,x4,_this4,x5,_this5,x6,_this6,x7,_this7,x8,_this8,x9,_this9,xa,_thisa,_thisb;
      return Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","position: fixed; top: 45px; right: 200px; background-color: white; border: 1px solid;"))])),List.ofArray([(x=Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","font-weight: bold; background-color: black; color: white; padding: 10px; cursor: pointer;"))])),List.ofArray([Default.Text("Config")])),(f=(x1=function()
      {
       return function()
       {
        return jQuery("#form").toggle();
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x1,arg10);
      }),(f(x),x))),Operators.add(Default.Div(List.ofArray([Default.Id("form"),(_this2=Default.Attr(),_this2.NewAttr("style","display: none; margin: 10px; width: 300px;"))])),List.ofArray([Default.Form(List.ofArray([(x2=List.ofArray([(x3=List.ofArray([Default.Text("Formatting Configuration")]),(_this3=Default.Tags(),_this3.NewTag("legend",x3))),Client1.indentSpaceNum(),(x4=List.ofArray([Default.Text("Page width")]),(_this4=Default.Tags(),_this4.NewTag("label",x4))),Client1.pageWidth(),Default.Hr(Runtime.New(T,{
       $:0
      })),Operators.add((x5=List.ofArray([Default.Attr().Class("checkbox")]),(_this5=Default.Tags(),_this5.NewTag("label",x5))),List.ofArray([Client1.semicolonAtEndOfLine(),Default.Text("Semicolon at end of line")])),Operators.add((x6=List.ofArray([Default.Attr().Class("checkbox")]),(_this6=Default.Tags(),_this6.NewTag("label",x6))),List.ofArray([Client1.spaceBeforeArgument(),Default.Text("Space before argument")])),Operators.add((x7=List.ofArray([Default.Attr().Class("checkbox")]),(_this7=Default.Tags(),_this7.NewTag("label",x7))),List.ofArray([Client1.spaceBeforeColon(),Default.Text("Space before colon")])),Operators.add((x8=List.ofArray([Default.Attr().Class("checkbox")]),(_this8=Default.Tags(),_this8.NewTag("label",x8))),List.ofArray([Client1.spaceAfterComma(),Default.Text("Space after comma")])),Operators.add((x9=List.ofArray([Default.Attr().Class("checkbox")]),(_this9=Default.Tags(),_this9.NewTag("label",x9))),List.ofArray([Client1.spaceAfterSemicolon(),Default.Text("Space after semicolon")])),Operators.add((xa=List.ofArray([Default.Attr().Class("checkbox")]),(_thisa=Default.Tags(),_thisa.NewTag("label",xa))),List.ofArray([Client1.indentOnTryWith(),Default.Text("Indent on try with")]))]),(_thisb=Default.Tags(),_thisb.NewTag("fieldset",x2)))]))]))]));
     }),
     indentOnTryWith:Runtime.Field(function()
     {
      var _this;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox"))]));
     }),
     indentSpaceNum:Runtime.Field(function()
     {
      var x,f,f1;
      x=Default.Select(Runtime.New(T,{
       $:0
      }));
      f=(f1=function(elt)
      {
       return elt.set_Html("<select>\r\n                        <option>1</option>\r\n                        <option>2</option>\r\n                        <option>3</option>\r\n                        <option selected='selected'>4</option>\r\n                        <option>5</option>\r\n                        <option>6</option>\r\n                        <option>7</option>\r\n                        <option>8</option>\r\n                        <option>9</option>\r\n                        <option>10</option>\r\n                    </select>");
      },function(w)
      {
       return Operators.OnAfterRender(f1,w);
      });
      f(x);
      return x;
     }),
     main:function()
     {
      var textArea,_this,_textArea_,_this1,btn,x,el,_this2,inner,f,x1;
      textArea=Default.TextArea(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","width: 450px; height: 600px; overflow: scroll; word-wrap: normal;"))]));
      _textArea_=Default.TextArea(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","width: 450px; height: 600px; overflow: scroll; word-wrap: normal;"))]));
      btn=(x=(el=Default.Button(List.ofArray([Default.Attr().Class("span2 btn btn-primary"),(_this2=Default.Attr(),_this2.NewAttr("style","width: 100px; height: 40px; margin-top: 200px;"))])),(inner=Default.Text("Format"),Operators.add(el,List.ofArray([inner])))),(f=(x1=function(elt)
      {
       return function()
       {
        var x2,f1,f3;
        x2=(f1=function()
        {
         var objectArg,arg00,config,_this3,objectArg1,arg001,_this4,objectArg2,arg002,_this5,objectArg3,arg003,_this6,objectArg4,arg004,_this7,objectArg5,arg005,_this8,objectArg6,arg006,x3,f2;
         objectArg=elt["HtmlProvider@32"];
         ((arg00=elt.Body,function(arg10)
         {
          return function(arg20)
          {
           return objectArg.SetAttribute(arg00,arg10,arg20);
          };
         })("disabled"))("disabled");
         config={
          IndentSpaceNum:Client1.indentSpaceNum().get_Value(),
          PageWidth:Client1.pageWidth().get_Value(),
          SemicolonAtEndOfLine:(_this3=Client1.semicolonAtEndOfLine(),(objectArg1=_this3["HtmlProvider@32"],(arg001=_this3.Body,function(arg10)
          {
           return objectArg1.HasAttribute(arg001,arg10);
          })("checked"))),
          SpaceBeforeArgument:(_this4=Client1.spaceBeforeArgument(),(objectArg2=_this4["HtmlProvider@32"],(arg002=_this4.Body,function(arg10)
          {
           return objectArg2.HasAttribute(arg002,arg10);
          })("checked"))),
          SpaceBeforeColon:(_this5=Client1.spaceBeforeColon(),(objectArg3=_this5["HtmlProvider@32"],(arg003=_this5.Body,function(arg10)
          {
           return objectArg3.HasAttribute(arg003,arg10);
          })("checked"))),
          SpaceAfterComma:(_this6=Client1.spaceAfterComma(),(objectArg4=_this6["HtmlProvider@32"],(arg004=_this6.Body,function(arg10)
          {
           return objectArg4.HasAttribute(arg004,arg10);
          })("checked"))),
          SpaceAfterSemicolon:(_this7=Client1.spaceAfterSemicolon(),(objectArg5=_this7["HtmlProvider@32"],(arg005=_this7.Body,function(arg10)
          {
           return objectArg5.HasAttribute(arg005,arg10);
          })("checked"))),
          IndentOnTryWith:(_this8=Client1.indentOnTryWith(),(objectArg6=_this8["HtmlProvider@32"],(arg006=_this8.Body,function(arg10)
          {
           return objectArg6.HasAttribute(arg006,arg10);
          })("checked")))
         };
         _textArea_.set_Value("");
         x3=Remoting.Async("Website:1",[textArea.get_Value(),config]);
         f2=function(_arg11)
         {
          var objectArg7,arg007;
          _textArea_.set_Value(_arg11);
          objectArg7=elt["HtmlProvider@32"];
          (arg007=elt.Body,function(arg10)
          {
           return objectArg7.RemoveAttribute(arg007,arg10);
          })("disabled");
          return Concurrency.Return(null);
         };
         return Concurrency.Bind(x3,f2);
        },Concurrency.Delay(f1));
        f3=function(arg00)
        {
         var t;
         t={
          $:0
         };
         return Concurrency.Start(arg00);
        };
        return f3(x2);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x1,arg10);
      }),(f(x),x)));
      return Default.Div(List.ofArray([Client1.config(),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("row")])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("span5")])),List.ofArray([Default.H3(List.ofArray([Default.Text("F# Code")])),textArea])),btn,Operators.add(Default.Div(List.ofArray([Default.Attr().Class("span5")])),List.ofArray([Default.H3(List.ofArray([Default.Text("Formatted Output")])),_textArea_]))]))]));
     },
     pageWidth:Runtime.Field(function()
     {
      var _this;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("value","80"))]));
     }),
     semicolonAtEndOfLine:Runtime.Field(function()
     {
      var _this,_this1;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox")),(_this1=Default.Attr(),_this1.NewAttr("checked","checked"))]));
     }),
     spaceAfterComma:Runtime.Field(function()
     {
      var _this,_this1;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox")),(_this1=Default.Attr(),_this1.NewAttr("checked","checked"))]));
     }),
     spaceAfterSemicolon:Runtime.Field(function()
     {
      var _this,_this1;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox")),(_this1=Default.Attr(),_this1.NewAttr("checked","checked"))]));
     }),
     spaceBeforeArgument:Runtime.Field(function()
     {
      var _this;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox"))]));
     }),
     spaceBeforeColon:Runtime.Field(function()
     {
      var _this,_this1;
      return Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("type","checkbox")),(_this1=Default.Attr(),_this1.NewAttr("checked","checked"))]));
     })
    },
    Control:Runtime.Class({
     get_Body:function()
     {
      return Client1.main();
     }
    })
   },
   Forkme:{
    Viewer:Runtime.Class({
     get_Body:function()
     {
      return Forkme.ribbon();
     }
    }),
    ribbon:function()
    {
     return Operators.add(Default.A(List.ofArray([Default.HRef("https://github.com/TahaHachana/WebSharperDemo")])),List.ofArray([Default.Img(List.ofArray([Default.Src("https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"),Default.Alt("Fork me on GitHub"),Default.Id("forkme")]))]));
    }
   },
   Geolocation:{
    Viewer:Runtime.Class({
     get_Body:function()
     {
      return Geolocation.main();
     }
    }),
    main:function()
    {
     var div,x,_this,f,f1,btn;
     div=(x=Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","padding-bottom:20px; width:500px; height:300px;"))])),(f=(f1=function(elt)
     {
      var center,options,map;
      center=new google.maps.LatLng(37.4419,-122.1419);
      options={
       zoom:14,
       center:center,
       mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      map=new google.maps.Map(elt.Body,options);
      return jQuery("#locate-me").click(function()
      {
       var x1,f2,f7;
       x1=(f2=function()
       {
        var x2,f3;
        x2=Geolocation.position();
        f3=function(_arg1)
        {
         var coords,center1,markerOptions,marker,req,returnVal,addressElt,x3,_this1,iwOptions,iw,x7,f6;
         coords=_arg1.coords;
         center1=new google.maps.LatLng(coords.latitude,coords.longitude);
         map.panTo(center1);
         markerOptions={
          position:center1
         };
         markerOptions.map=map;
         marker=new google.maps.Marker(markerOptions);
         req=(returnVal=[{}],(null,returnVal[0].bounds=new google.maps.LatLngBounds(center1),returnVal[0]));
         addressElt=(x3=List.ofArray([Default.Text("")]),(_this1=Default.Tags(),_this1.NewTag("address",x3)));
         (new google.maps.Geocoder()).geocode(req,Runtime.Tupled(function(tupledArg)
         {
          var results,status,address,x4,x5,f4,mapping,f5;
          results=tupledArg[0];
          status=tupledArg[1];
          if(Unchecked.Equals(status,google.maps.GeocoderStatus.OK))
           {
            address=(x4=(x5=results[0].address_components,(f4=(mapping=function(x6)
            {
             return x6.short_name;
            },function(array)
            {
             return Arrays.map(mapping,array);
            }),f4(x5))),(f5=function(strings)
            {
             return Strings.concat(", ",strings);
            },f5(x4)));
            return addressElt.set_Html(address);
           }
          else
           {
            return null;
           }
         }));
         iwOptions={};
         iwOptions.content=addressElt.Body;
         iwOptions.position=center1;
         iw=new google.maps.InfoWindow(iwOptions);
         x7=google.maps.event.addListener(marker,"click",function()
         {
          return iw.open(map);
         });
         f6=function(value)
         {
          value;
         };
         f6(x7);
         return Concurrency.Return(null);
        };
        return Concurrency.Bind(x2,f3);
       },Concurrency.Delay(f2));
       f7=function(arg00)
       {
        var t;
        t={
         $:0
        };
        return Concurrency.Start(arg00);
       };
       return f7(x1);
      });
     },function(w)
     {
      return Operators.OnAfterRender(f1,w);
     }),(f(x),x)));
     btn=Operators.add(Default.Button(List.ofArray([Default.Id("locate-me"),Default.Attr().Class("btn btn-large btn-primary")])),List.ofArray([Default.Text("Locate Me")]));
     return Default.Div(List.ofArray([div,btn]));
    },
    position:function()
    {
     var callback;
     callback=Runtime.Tupled(function(tupledArg)
     {
      var onOk,_arg1,_arg2;
      onOk=tupledArg[0];
      _arg1=tupledArg[1];
      _arg2=tupledArg[2];
      return window.navigator.geolocation.getCurrentPosition(onOk);
     });
     return Concurrency.FromContinuations(function(ok)
     {
      return function(no)
      {
       return callback([ok,no,function(value)
       {
        value;
       }]);
      };
     });
    }
   },
   Html5Logo:{
    Client:{
     Viewer:Runtime.Class({
      get_Body:function()
      {
       return Client2.canvas();
      }
     }),
     canvas:function()
     {
      var element,_this,x,_this1,canvas,context,f,f1;
      element=(_this=HTML5.Tags(),(x=List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","display: none;"))]),_this.NewTag("canvas",x)));
      canvas=element.Body;
      canvas.height=400;
      canvas.width=600;
      context=canvas.getContext("2d");
      context.font="60px 'Gill Sans Ultra Bold'";
      context.fillText("HTML",40,60);
      context.translate(0,70);
      Client2.drawShape(context,"#E34C26",44,255,List.ofArray([[22,5],[267,5],[244,255],[144,283]]));
      Client2.drawShape(context,"#F06529",144,262,List.ofArray([[225,239],[244,25],[144,25]]));
      Client2.drawShape(context,"#EBEBEB",144,118,List.ofArray([[103,118],[101,87],[144,87],[144,56],[67,56],[75,149],[144,149]]));
      Client2.drawShape(context,"#EBEBEB",144,198,List.ofArray([[110,189],[108,164],[77,164],[81,212],[144,230]]));
      Client2.drawShape(context,"#FFFFFF",144,118,List.ofArray([[144,149],[182,149],[178,189],[144,198],[144,230],[207,212],[215,118]]));
      Client2.drawShape(context,"#FFFFFF",144,56,List.ofArray([[144,87],[218,87],[221,56]]));
      f=(f1=function(x1)
      {
       return jQuery(x1.Body).fadeIn(1000);
      },function(w)
      {
       return Operators.OnAfterRender(f1,w);
      });
      f(element);
      return element;
     },
     drawLine:function(context,x,y)
     {
      return context.lineTo(x,y);
     },
     drawPaths:function(context,coords)
     {
      var f,action;
      f=(action=Runtime.Tupled(function(tupledArg)
      {
       var x,y;
       x=tupledArg[0];
       y=tupledArg[1];
       return Client2.drawLine(context,x,y);
      }),function(list)
      {
       return Seq.iter(action,list);
      });
      f(coords);
      context.closePath();
      return context.fill();
     },
     drawShape:function(_,_1,_2,_3,_4)
     {
      return((Runtime.Tupled(function(moveTo)
      {
       return function(coords)
       {
        _.fillStyle=_1;
        _.beginPath();
        (Runtime.Tupled(function(tupledArg)
        {
         var arg00,arg01;
         arg00=tupledArg[0];
         arg01=tupledArg[1];
         return _.moveTo(arg00,arg01);
        }))(moveTo);
        return Client2.drawPaths(_,coords);
       };
      }))([_2,_3]))(_4);
     }
    }
   },
   Slideshow:{
    Viewer:Runtime.Class({
     get_Body:function()
     {
      return Slideshow.main();
     }
    }),
    animateSlideshow:function(animationSpeed,interval)
    {
     var animationAllowed,slider,frameWidth,_frameWidth_,itemCount,width,slideLeft,slideRight,autoSlide,x,f;
     animationAllowed={
      contents:true
     };
     slider=jQuery("#slidesContainer");
     frameWidth=slider.width();
     _frameWidth_="-"+Global.String(frameWidth)+"px";
     itemCount=jQuery(".slide").length;
     width=Global.String(itemCount*frameWidth)+"px";
     slider.css("width",width);
     jQuery(".slide").filter(":first").before(jQuery(".slide").filter(":last"));
     slider.css("left",_frameWidth_);
     slideLeft=function()
     {
      jQuery(".slide").filter(":last").after(jQuery(".slide").filter(":first"));
      slider.css("left","0px");
      return slider.animate({
       left:-frameWidth
      },animationSpeed);
     };
     slideRight=function()
     {
      return slider.animate({
       left:0
      },animationSpeed,function()
      {
       slider.css("left",_frameWidth_);
       return jQuery(".slide").filter(":first").before(jQuery(".slide").filter(":last"));
      });
     };
     autoSlide=function()
     {
      var matchValue;
      matchValue=animationAllowed.contents;
      if(matchValue)
       {
        return slideLeft(null);
       }
      else
       {
        return null;
       }
     };
     x=setInterval(autoSlide,interval);
     f=function(value)
     {
      value;
     };
     f(x);
     jQuery(".slide, .carouselControl").hover(function()
     {
      animationAllowed.contents=false;
     });
     jQuery(".slide").mouseout(function()
     {
      animationAllowed.contents=true;
     });
     return jQuery(".carouselControl").click(function()
     {
      var x1,f1;
      x1=jQuery(this).attr("id")==="rightControl";
      f1=function(_arg1)
      {
       if(_arg1)
        {
         return slideLeft(null);
        }
       else
        {
         return slideRight(null);
        }
      };
      return f1(x1);
     });
    },
    main:function()
    {
     var x,_this,_this1,f,f1;
     x=Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("id","slideshow"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("id","slidesContainer"))])),Seq.toList(Seq.delay(function()
     {
      return Slideshow.slides();
     }))),Default.Span(List.ofArray([Default.Attr().Class("carouselControl"),Default.Id("leftControl"),Default.Text("\u2039")])),Default.Span(List.ofArray([Default.Attr().Class("carouselControl"),Default.Id("rightControl"),Default.Text("\u203a")]))]));
     f=(f1=function()
     {
      return Slideshow.animateSlideshow(700,4000);
     },function(w)
     {
      return Operators.OnAfterRender(f1,w);
     });
     f(x);
     return x;
    },
    slideDiv:function(slide,height,width)
    {
     return Operators.add(Default.Div(List.ofArray([Default.Attr().Class("slide")])),List.ofArray([Default.Img(List.ofArray([Default.Src(slide.Src),Default.Alt(slide.Alt),Default.Height(height),Default.Width(width)])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("carouselCaption")])),List.ofArray([Default.H4(List.ofArray([Default.Text(slide.Heading)])),Default.P(List.ofArray([Default.Text(slide.Description)])),Default.A(List.ofArray([Default.Text("Click Here"),Default.HRef(slide.Href)]))]))]));
    },
    slides:Runtime.Field(function()
    {
     var x,f,mapping;
     x=List.ofArray([{
      Src:"Images/Carousel/Slide1.jpg",
      Alt:"Slide 1",
      Heading:"Slide 1",
      Description:"Slide 1 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide2.jpg",
      Alt:"Slide 2",
      Heading:"Slide 2",
      Description:"Slide 2 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide3.jpg",
      Alt:"Slide 3",
      Heading:"Slide 3",
      Description:"Slide 3 description",
      Href:"#"
     },{
      Src:"Images/Carousel/Slide4.jpg",
      Alt:"Slide 4",
      Heading:"Slide 4",
      Description:"Slide 4 description",
      Href:"#"
     }]);
     f=(mapping=function(x1)
     {
      return Slideshow.slideDiv(x1,"512","958");
     },function(list)
     {
      return List.map(mapping,list);
     });
     return f(x);
    })
   },
   Twitter:{
    Client:{
     atRegex:Runtime.Field(function()
     {
      return new RegExp("(@)([A-Za-z0-9-_]+)","g");
     }),
     displayTweets:function(elt)
     {
      return jQuery.getJSON("http://search.twitter.com/search.json?q=%23fsharp&amp;rpp=50&amp;callback=?",Runtime.Tupled(function(tupledArg)
      {
       var data,_arg1,x,f,action;
       data=tupledArg[0];
       _arg1=tupledArg[1];
       x=data.results;
       f=(action=function(result)
       {
        var tweetHtml,x1,f1;
        tweetHtml=(Client3.linkify())(result.text);
        x1=Client3.tweetLi(result.from_user,result.id_str,result.profile_image_url,result.from_user_name,tweetHtml,result.created_at);
        f1=function(arg00)
        {
         return elt.AppendI(arg00);
        };
        return f1(x1);
       },function(array)
       {
        return Arrays.iter(action,array);
       });
       return f(x);
      })).then(function()
      {
       Client3.toggleActionsVisibility();
       return Client3.handleTweetActions();
      },function()
      {
       return alert("An error occured.");
      });
     },
     handleTweetActions:function()
     {
      var jquery;
      jquery=jQuery("a.tweet-action-link");
      return jquery.click(function(event)
      {
       var href,x,f;
       event.preventDefault();
       href=this.getAttribute("href");
       x=window.showModalDialog(href);
       f=function(value)
       {
        value;
       };
       return f(x);
      });
     },
     hashRegex:Runtime.Field(function()
     {
      return new RegExp("(#)([A-Za-z0][A-Za-z0-9-_]+)","g");
     }),
     linkify:Runtime.Field(function()
     {
      var f,f1,g,g1;
      f=(f1=function(str)
      {
       return Client3.replaceUrls(str);
      },(g=function(str)
      {
       return Client3.replaceUsers(str);
      },function(x)
      {
       return g(f1(x));
      }));
      g1=function(str)
      {
       return Client3.replaceHashs(str);
      };
      return function(x)
      {
       return g1(f(x));
      };
     }),
     main:function()
     {
      var x,f,f1;
      x=Default.UL(List.ofArray([Default.Attr().Class("unstyled")]));
      f=(f1=function(elt)
      {
       var x1,f2,f4;
       x1=(f2=function()
       {
        var x2,f3;
        x2=Client3.displayTweets(elt);
        f3=function(value)
        {
         value;
        };
        f3(x2);
        return Concurrency.Return(null);
       },Concurrency.Delay(f2));
       f4=function(arg00)
       {
        var t;
        t={
         $:0
        };
        return Concurrency.Start(arg00);
       };
       return f4(x1);
      },function(w)
      {
       return Operators.OnAfterRender(f1,w);
      });
      f(x);
      return x;
     },
     replaceHashs:function(str)
     {
      return(new String(str)).replace(Client3.hashRegex(),"<a href=\"https://twitter.com/search/?q=%23$2\" target=\"_blank\">#$2</a>");
     },
     replaceUrls:function(str)
     {
      return(new String(str)).replace(Client3.urlRegex(),"<a href=\"$1\" target=\"_blank\">$1</a>");
     },
     replaceUsers:function(str)
     {
      return(new String(str)).replace(Client3.atRegex(),"<a href=\"https://twitter.com/$2\" target=\"_blank\">@$2</a>");
     },
     toggleActionsVisibility:function()
     {
      var jquery;
      jquery=jQuery(".tweet");
      jquery.mouseenter(function()
      {
       return jQuery(".tweetActions",this).css("visibility","visible");
      });
      return jquery.mouseleave(function()
      {
       return jQuery(".tweetActions",this).css("visibility","hidden");
      });
     },
     tweetLi:function(screenName,tweetId,profileImage,fullName,tweetHtml,creationDate)
     {
      var profileLink,replyLink,retweetLink,favoriteLink,p,_this,x,_this1,x1,_this2,_this3,_this4,_this5;
      profileLink="https://twitter.com/"+screenName;
      replyLink="https://twitter.com/intent/tweet?in_reply_to="+tweetId;
      retweetLink="https://twitter.com/intent/retweet?tweet_id="+tweetId;
      favoriteLink="https://twitter.com/intent/favorite?tweet_id="+tweetId;
      p=Default.P(Runtime.New(T,{
       $:0
      }));
      p.set_Html(tweetHtml);
      return Operators.add(Default.LI(List.ofArray([Default.Attr().Class("tweet"),(_this=Default.Attr(),_this.NewAttr("style","clear: both;"))])),List.ofArray([Default.Div(List.ofArray([Operators.add(Operators.add(Default.A(List.ofArray([Default.HRef(profileLink),Default.Attr().Class("twitterProfileLink")])),List.ofArray([Default.Img(List.ofArray([Default.Src(profileImage),Default.Alt(fullName),Default.Attr().Class("avatar"),Default.Height("48"),Default.Width("48")])),(x=List.ofArray([Default.Text(fullName)]),(_this1=Default.Tags(),_this1.NewTag("strong",x)))])),List.ofArray([Default.Text(" @"+screenName)])),Default.Br(Runtime.New(T,{
       $:0
      })),(x1=List.ofArray([Default.Text(creationDate)]),(_this2=Default.Tags(),_this2.NewTag("small",x1))),p,Operators.add(Default.Div(List.ofArray([Default.Attr().Class("tweetActions"),(_this3=Default.Attr(),_this3.NewAttr("style","visibility: hidden;"))])),List.ofArray([Operators.add(Default.A(List.ofArray([Default.HRef(replyLink),Default.Attr().Class("tweet-action-link"),(_this4=Default.Attr(),_this4.NewAttr("style","margin-right: 5px;"))])),List.ofArray([Default.Text("Reply")])),Operators.add(Default.A(List.ofArray([Default.HRef(retweetLink),Default.Attr().Class("tweet-action-link"),(_this5=Default.Attr(),_this5.NewAttr("style","margin-right: 5px;"))])),List.ofArray([Default.Text("Retweet")])),Operators.add(Default.A(List.ofArray([Default.HRef(favoriteLink),Default.Attr().Class("tweet-action-link")])),List.ofArray([Default.Text("Favorite")]))]))]))]));
     },
     urlRegex:Runtime.Field(function()
     {
      return new RegExp("([A-Za-z]+:\\/\\/[A-Za-z0-9-_]+\\.[A-Za-z0-9-_:%&amp;;\\?\\/.=]+)","g");
     })
    },
    Control:Runtime.Class({
     get_Body:function()
     {
      return Client3.main();
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Website=Runtime.Safe(Global.Website);
  Crawler=Runtime.Safe(Website.Crawler);
  Client=Runtime.Safe(Crawler.Client);
  jQuery=Runtime.Safe(Global.jQuery);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  HTML5=Runtime.Safe(Default.HTML5);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  alert=Runtime.Safe(Global.alert);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  Enhance=Runtime.Safe(Formlet.Enhance);
  Data=Runtime.Safe(Formlet.Data);
  Operators=Runtime.Safe(Html.Operators);
  Fantomas=Runtime.Safe(Website.Fantomas);
  Client1=Runtime.Safe(Fantomas.Client);
  T=Runtime.Safe(List.T);
  Forkme=Runtime.Safe(Website.Forkme);
  Geolocation=Runtime.Safe(Website.Geolocation);
  google=Runtime.Safe(Global.google);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Strings=Runtime.Safe(WebSharper.Strings);
  window=Runtime.Safe(Global.window);
  Html5Logo=Runtime.Safe(Website.Html5Logo);
  Client2=Runtime.Safe(Html5Logo.Client);
  Seq=Runtime.Safe(WebSharper.Seq);
  Slideshow=Runtime.Safe(Website.Slideshow);
  setInterval=Runtime.Safe(Global.setInterval);
  RegExp=Runtime.Safe(Global.RegExp);
  Twitter=Runtime.Safe(Website.Twitter);
  Client3=Runtime.Safe(Twitter.Client);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
  Client3.urlRegex();
  Client3.linkify();
  Client3.hashRegex();
  Client3.atRegex();
  Slideshow.slides();
  Client1.spaceBeforeColon();
  Client1.spaceBeforeArgument();
  Client1.spaceAfterSemicolon();
  Client1.spaceAfterComma();
  Client1.semicolonAtEndOfLine();
  Client1.pageWidth();
  Client1.indentSpaceNum();
  Client1.indentOnTryWith();
  Client1.config();
 });
}());
