<?php
        $filename = $_POST['nom_fichier'];
        if (file_exists($filename)) {
            unlink($filename); // Supprime le fichier s'il existe
            echo "Le fichier $filename a été supprimé.";
        } else {
            echo "Le fichier $filename n'existe pas.";
        }
?>