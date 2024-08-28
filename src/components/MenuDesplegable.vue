<script setup>
import { ref } from 'vue';

const menuItems = {
  "/administracion_municipal_y_operadores_de_justicia": "Encuesta A La Administración Municipal Y Operadores De Justicia",
  "/necesidades_juridicas": "Encuesta Sobre Necesidades Jurídicas",
  "/necesidades_juridicas_comunidades_etnicas": "Encuesta De Necesidades Jurídicas - Comunidades Étnicas",
  "/necesidades_juridicas_sector_educativo": "Encuesta De Necesidades Jurídicas - Sector Educativo"
};

const isCollapsed = ref(true);

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <aside class="menu_desplegable" :class="{ 'collapsed': isCollapsed }">
    <header @click="toggleMenu" :class="{ 'collapsed': isCollapsed }">
      <i class="bi bi-list"></i>
      <p v-if="!isCollapsed">Encuestas</p>
    </header>
    <ul v-if="!isCollapsed">
      <li v-for="[key, value] in Object.entries(menuItems)">
        <RouterLink class="link" :to="key">{{ value }}</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.menu_desplegable {
  height: 100vh;
  background-color: var(--color-darkBlue);
  color: var(--color-white);
  width: 350px;
  transition: 0.3s ease;
  position: absolute;
  height: auto;
  left: 0;
  box-shadow: 5px 7px 5px rgb(255, 255, 255);
}

.menu_desplegable.collapsed {
    transition: 0.3s ease;
    width: 60px;
    color: var(--color-darkBlue);
    background-color: #00000000;
    box-shadow: none
}

header {
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  font-size: 30px;
}

header p {
  font-size: 22px;
}

ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 20px;
  gap: 20px;
}

ul li {
  background-color: var(--color-white);
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.link {
  color: var(--color-black);
  text-decoration: none;
}

@media (max-width: 768px) {
  .menu_desplegable {
    position: absolute;
    width: 100vw;
  }

  .menu_desplegable.collapsed {
    width: 60px;
    min-width: 60px;
  }

}
</style>