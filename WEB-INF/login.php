<?php $_SESSION['action'] = "actionLogin()"; ?>

<form id="login" method="GET" onsubmit="return actionLogin();">
     <div class="jumbotron div-container-login">

           <div class="form-group">
                 <span><h4>Usuari: </h4></span>
                 <div class="div-form div-input-form">
                       <input id="usuario" type="text" placeholder="Nom d'usuari..." class="form-control">
                 </div>
           </div>

           <div class="form-group">
                 <span>
                      <h4>Password:</h4></span>
                 <div class="div-input-form">
                       <input id="password" type="password" class="form-control">
                 </div>
           </div>

          <?php include_once "./tags/form-buttons.php" ?>
          <?php include_once "./tags/error-validation.php" ?>


     </div>
</form>

<?php
