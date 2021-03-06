#pragma checksum "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "594c6012b86d81ec6e7a12f7c2be78bd6b7dabfa"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_GetCustomerStatement), @"mvc.1.0.view", @"/Views/Home/GetCustomerStatement.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\_ViewImports.cshtml"
using TovutiUI;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\_ViewImports.cshtml"
using TovutiUI.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\_ViewImports.cshtml"
using Microsoft.AspNetCore.Identity;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
using System.Globalization;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"594c6012b86d81ec6e7a12f7c2be78bd6b7dabfa", @"/Views/Home/GetCustomerStatement.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0390d6217c6fc0fff8a6253f10109c105a33a07d", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_GetCustomerStatement : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<TovutiUI.Models.JointPaymentModel>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 3 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
  
    ViewData["Title"] = "GetCustomerStatement";
    Layout = "~/Pages/Shared/_Layout.cshtml";
    CultureInfo culture = new CultureInfo("en-US");

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div class=""portlet light portlet-fit portlet-datatable bordered"">
    <div class=""portlet-title"">
        <div class=""caption"">
            <i class=""icon-settings font-green""></i>
            <span class=""caption-subject font-green sbold uppercase""> Customer Detailed Statement </span>
        </div>
    </div>
    <br />
     
    <div class=""portlet-body"">
          <div class=""form-body"">
              <div class=""table-container"">
                  <div class=""feedbackMsg""></div>
                    <div class=""scroll"">
                        <table class=""table table-responsive"" id=""tbl_customer_statement"">
                            <thead>
                                <tr>
                                    <th> Date Paid </th>
                                    <th> Transaction Id </th>          
                                    <th> Amount Loaned  </th>
                                    <th> Amount Paid </th> 
                                </tr>
                  ");
            WriteLiteral("          </thead>\r\n                            <tbody>\r\n");
#nullable restore
#line 32 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                 foreach (var item in Model) {

#line default
#line hidden
#nullable disable
            WriteLiteral("                                    <tr>\r\n                                        <td> ");
#nullable restore
#line 34 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                        Write(DateTime.Parse(item.paydate.ToString("dd/MM/yyyy"), culture.DateTimeFormat).ToShortDateString());

#line default
#line hidden
#nullable disable
            WriteLiteral(" </td>\r\n                                        <td>  ");
#nullable restore
#line 35 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                         Write(Html.DisplayFor(modelItem => item.trx_id));

#line default
#line hidden
#nullable disable
            WriteLiteral(" </td>\r\n                                        <td>  ");
#nullable restore
#line 36 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                         Write(Html.DisplayFor(modelItem => item.amountgiven));

#line default
#line hidden
#nullable disable
            WriteLiteral(" </td>                                           \r\n                                        <td>  ");
#nullable restore
#line 37 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                         Write(Html.DisplayFor(modelItem => item.amtpaid));

#line default
#line hidden
#nullable disable
            WriteLiteral(" </td>                                            \r\n                                    </tr>\r\n");
#nullable restore
#line 39 "D:\very@Personal\Interviews\Tovuti\TovutiUI\Views\Home\GetCustomerStatement.cshtml"
                                }

#line default
#line hidden
#nullable disable
            WriteLiteral(@"                                <tfoot>
                                <tr>
                                    <th colspan=""3"" style=""text-align:left""> &nbsp;&nbsp;</th>
                                    <th colspan=""1""  ></th>
                                    <th></th>
                                </tr>
                            </tfoot> 
                            </tbody>
                             
                        </table>
                    </div>
              </div>
          </div>
     </div>
</div>
");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<TovutiUI.Models.JointPaymentModel>> Html { get; private set; }
    }
}
#pragma warning restore 1591
