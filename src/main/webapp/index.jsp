<%--
    Document   : index.jsp
    Created on : Apr 22, 2024, 8:09:01 AM
    Author     : joelbecerramiranda
--%>

<%@page import="mx.intran.ecommerce.to.PermisosTO"%>
<%@page import="java.lang.reflect.Field"%>
<%@page import="mx.intran.ecommerce.model.PageModel" %>
<%@page import="mx.intran.ecommerce.to.UsuarioTO" %>

<%
    PageModel pageModel = (PageModel)session.getAttribute("pageModel");
    if (pageModel==null)
        pageModel = new PageModel();

    UsuarioTO usuario = (UsuarioTO)session.getAttribute("usuario");
    boolean loggeado = usuario!=null;
    if (usuario==null) {
        usuario = new UsuarioTO();
        usuario.permisos = new PermisosTO();
    }
%>

<%
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 60);
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="es">
    <%@include file="assets/content/head.html"%>

    <body>
        <!-- Start Preloader Area -->
        <div class="preloader">
            <div class="loader">
                <div class="sbl-half-circle-spin">
                    <div></div>
                </div>
            </div>
        </div>
        <!-- End Preloader Area -->
        <%@include file="assets/content/header.html"%>

        <div id="page-container"></div>

        <%@include file="assets/content/footer.html"%>

        <!-- Start Go Top Area -->
        <div class="go-top">
            <i class='bx bx-up-arrow-alt'></i>
        </div>
        <!-- End Go Top Area -->
        <!-- Start Modals -->
        <div id="modalDialogBusquedas" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalDialogBusquedasLabel" aria-hidden="true">
            <div id="modalDialogBusquedasDocument" class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="block block-rounded shadow-none mb-0">
                        <div id="modalDialogBusquedasHeader" class="vision-content p-2">
                            <div class="row">
                                <div class="col-10">
                                    <h3 id="modalDialogBusquedasTitle">Title</h3>
                                </div>
                                <div class="col-2 text-end">
                                    <a class="pointer" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="bx bx-x fs-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- div id="modalDialogBusquedasHeader" class="block-header block-header-default bg-primary text-white">
                            <h3 id="modalDialogBusquedasTitle" class="block-title">Title</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option text-white" data-bs-dismiss="modal" aria-label="Close">
                                    <i class="bx bx-timer"></i>
                                </button>
                            </div>
                        </div -->
                        <div id="modalDialogBusquedasBody" class="block-content p-2">
                        </div>
                        <div id="modalDialogBusquedasFooter" class="text-end border-top p-2">
                            <button id="modalDialogBusquedasCancel" type="button" class="btn btn-outline-primary">
                                <span class="bx bx-exit" aria-hidden="true"></span>&nbsp;Cancelar
                            </button>
                            <button id="modalDialogBusquedasAccept" type="button" class="btn btn-outline-primary">
                                <span class="bx bx-check" aria-hidden="true"></span>&nbsp;Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modals -->

        <%@include file="assets/content/scripts.html"%>
        <!-- -->
        <script>
            $(document).ready(function() {
                elCarrito = new HashMap();
                vistaInicio();
            });
        </script>
    </body>
</html>
