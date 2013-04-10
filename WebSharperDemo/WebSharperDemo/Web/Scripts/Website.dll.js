(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Website,Crawler,Client,jQuery,WebSharper,Arrays,Html,Default,List,HTML5,EventsPervasives,Remoting,alert,Concurrency,Formlet,Formlet1,Enhance,Data,Forkme,Operators,Geolocation,google,Unchecked,Strings,window,Html5Logo,Client1,Seq,Slideshow,setInterval,RegExp,Twitter,Client2,String,T;
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
       return Client1.canvas();
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
      Client1.drawShape(context,"#E34C26",44,255,List.ofArray([[22,5],[267,5],[244,255],[144,283]]));
      Client1.drawShape(context,"#F06529",144,262,List.ofArray([[225,239],[244,25],[144,25]]));
      Client1.drawShape(context,"#EBEBEB",144,118,List.ofArray([[103,118],[101,87],[144,87],[144,56],[67,56],[75,149],[144,149]]));
      Client1.drawShape(context,"#EBEBEB",144,198,List.ofArray([[110,189],[108,164],[77,164],[81,212],[144,230]]));
      Client1.drawShape(context,"#FFFFFF",144,118,List.ofArray([[144,149],[182,149],[178,189],[144,198],[144,230],[207,212],[215,118]]));
      Client1.drawShape(context,"#FFFFFF",144,56,List.ofArray([[144,87],[218,87],[221,56]]));
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
       return Client1.drawLine(context,x,y);
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
        return Client1.drawPaths(_,coords);
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
       var data,_arg1,x,x1,f,mapping,f1,action;
       data=tupledArg[0];
       _arg1=tupledArg[1];
       x=(x1=data.Results,(f=(mapping=function(result)
       {
        var tweetHtml;
        tweetHtml=(Client2.linkify())(result.Text);
        return Client2.tweetLi(result.FromUser,result.IdStr,result.ProfileImageUrl,result.FromUserName,tweetHtml,result.CreatedAt);
       },function(array)
       {
        return Arrays.map(mapping,array);
       }),f(x1)));
       f1=(action=function(arg00)
       {
        return elt.AppendI(arg00);
       },function(array)
       {
        return Arrays.iter(action,array);
       });
       return f1(x);
      }));
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
       return Client2.replaceUrls(str);
      },(g=function(str)
      {
       return Client2.replaceUsers(str);
      },function(x)
      {
       return g(f1(x));
      }));
      g1=function(str)
      {
       return Client2.replaceHashs(str);
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
        x2=Client2.displayTweets(elt);
        f3=function(value)
        {
         value;
        };
        f3(x2);
        Client2.toggleActionsVisibility();
        Client2.handleTweetActions();
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
      return(new String(str)).replace(Client2.hashRegex(),"<a href=\"https://twitter.com/search/?q=%23$2\" target=\"_blank\">#$2</a>");
     },
     replaceUrls:function(str)
     {
      return(new String(str)).replace(Client2.urlRegex(),"<a href=\"$1\" target=\"_blank\">$1</a>");
     },
     replaceUsers:function(str)
     {
      return(new String(str)).replace(Client2.atRegex(),"<a href=\"https://twitter.com/$2\" target=\"_blank\">@$2</a>");
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
      return Client2.main();
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
  Forkme=Runtime.Safe(Website.Forkme);
  Operators=Runtime.Safe(Html.Operators);
  Geolocation=Runtime.Safe(Website.Geolocation);
  google=Runtime.Safe(Global.google);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Strings=Runtime.Safe(WebSharper.Strings);
  window=Runtime.Safe(Global.window);
  Html5Logo=Runtime.Safe(Website.Html5Logo);
  Client1=Runtime.Safe(Html5Logo.Client);
  Seq=Runtime.Safe(WebSharper.Seq);
  Slideshow=Runtime.Safe(Website.Slideshow);
  setInterval=Runtime.Safe(Global.setInterval);
  RegExp=Runtime.Safe(Global.RegExp);
  Twitter=Runtime.Safe(Website.Twitter);
  Client2=Runtime.Safe(Twitter.Client);
  String=Runtime.Safe(Global.String);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
  Client2.urlRegex();
  Client2.linkify();
  Client2.hashRegex();
  Client2.atRegex();
  Slideshow.slides();
 });
}());
