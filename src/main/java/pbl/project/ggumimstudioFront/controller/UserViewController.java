package pbl.project.ggumimstudioFront.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller(value = "/")
public class UserViewController
{
    @GetMapping("")
    public String mainPage()
    {
        return "index";
    }

    @GetMapping("/myPage")
    public String myPage()
    {
        return "myPageMain";
    }

    @GetMapping("/myPage/shoppingCart")
    public String shoppingCart()
    {
        return "shoppingCart";
    }

    @GetMapping("/myPage/wishList")
    public String wishList()
    {
        return "wishList";
    }

    @GetMapping("/myPage/order/list")
    public String orderList()
    {
        return "orderList";
    }

    @GetMapping("/myPage/order/{orderId}")
    public String orderDetail(@PathVariable(name = "orderId") String orderId, Model model)
    {
        model.addAttribute("orderId", orderId);

        return "orderDetail";
    }

    @GetMapping("/product/{productUID}")
    public String productDetail(@PathVariable(name = "productUID") String productUID, Model model)
    {
        model.addAttribute("productUID", productUID);

        return "productDetail";
    }

    @GetMapping("/order/payment/{orderID}")
    public String orderPayment(@PathVariable(name = "orderID") String orderID, Model model)
    {
        model.addAttribute("orderID", orderID);

        return "orderPayment";
    }

    @GetMapping("/order/test")
    public String orderTestPage()
    {
        return "orderTest2";
    }


    @GetMapping("/project/notion")
    public RedirectView projectNotion()
    {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://dark-cow-eba.notion.site");
        return redirectView;
    }
}
