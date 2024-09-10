<script setup>
    import Question from '@/components/Question/Question.vue';
    import Chapter from '@/components/Chapter/Chapter.vue';

    const menuItems = {
        "01": ["/administracion_municipal_y_operadores_de_justicia", "Encuesta A La Administración Municipal Y Operadores De Justicia"],
        "02": ["/necesidades_juridicas", "Encuesta Sobre Necesidades Jurídicas"],
        "03": ["/necesidades_juridicas_comunidades_etnicas", "Encuesta De Necesidades Jurídicas - Comunidades Étnicas"],
        "04": ["/necesidades_juridicas_sector_educativo", "Encuesta De Necesidades Jurídicas - Sector Educativo"]
    }

    const chapter = 
        {
        id: "01",
        title: "Encuesta A La Administración Municipal Y Operadores De Justicia",
        questions: [
                {
                id: "00",
                type: "RU",
                label: "No es Final",
                options: [
                    {
                        value: "1",
                        label: "Si",
                    },
                    {
                        value: "2",
                        label: "No",
                        ref: {
                            id: "00.1",
                            label: "Referencia",
                            type: "RU",
                            options: [
                                {
                                    value: "1",
                                    label: "Si",
                                    ref: {
                                        id: "00.1.1",
                                        label: "Referencia",
                                        type: "RU",
                                        options: [
                                            {
                                                value: "1",
                                                label: "Si",
                                            },
                                            {
                                                value: "2",
                                                label: "No",
                                            }
                                        ]
                                    }
                                },
                                {
                                    value: "2",
                                    label: "No",
                                },
                                {
                                    value: "3",
                                    label: "tal vez"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: "01",
                isFinal: true,
                type: "RU",
                label: "autoriza? (es Final)",
                options: [
                    {
                        value: "1",
                        label: "Si",
                    },
                    {
                        value: "2",
                        label: "No",
                    }
                ]
            },
            {
                id: "02",
                isFinal: false,
                type: "RM",
                label: "multiple sin otro",
                options: [
                    {
                        value: "1",
                        label: "Si",
                    },
                    {
                        value: "2",
                        label: "No",
                    },
                    {
                        value: "3",
                        label: "tal vez"
                    }
                ]
            },
            {
                id: "03",
                isFinal: false,
                type: "RM",
                label: "multiple con otro",
                options: [
                    {
                        value: "1",
                        label: "Si",
                    },
                    {
                        value: "2",
                        label: "No",
                    },
                    {
                        value: "other",
                        label: "Otro",
                        isOther: true,
                        placeholder: "Por favor, especifique"
                    }
                ]
            },
            {
                id: "03",
                isFinal: false,
                type: "RM",
                label: "multiple con referencia",
                options: [
                    {
                        value: "1",
                        label: "Si",
                        ref: {
                            id: "1.1.1",
                            label: "Referencia",
                            type: "RM",
                            options: [
                                {
                                    value: "1",
                                    label: "Si",
                                    ref: {
                                        id: "1.1.1.1",
                                        label: "Referencia",
                                        type: "RM",
                                        options: [
                                            {
                                                value: "1",
                                                label: "Si",
                                            },
                                            {
                                                value: "2",
                                                label: "No",
                                            }
                                        ]
                                    }
                                },
                                {
                                    value: "2",
                                    label: "No",
                                },
                                {
                                    value: "3",
                                    label: "tal vez"
                                }
                            ]
                        }
                    },
                    {
                        value: "2",
                        label: "No",
                        ref: "02"
                    },
                    {
                        value: "other",
                        label: "Otro",
                        isOther: true,
                        placeholder: "Por favor, especifique"
                    }
                ]
            }
        ]
    };

   
</script>

<template>
    <main>
        <img src="/LogoMinisteriodeJusticia.png" alt="Logo Ministerio Justicia">
        <div class="encuestas__container">
            <ul>
                <li v-for = "[key, value] in Object.entries(menuItems)">
                    <div class="number">{{key}}</div>
                    <RouterLink class="link" :to="value[0]">{{ value[1] }}</RouterLink>
                </li>
                <Chapter :chapter="chapter"/>
            </ul>
        </div>
    </main>
</template>

<style scoped>

    main{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 50px;
    }

    main img{
        width: 500px;
    }

    .encuestas__container {
        width: 700px;
        height: 300px;
    }

    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        height: 100%;
        border: solid 1px var(--color-gray);
        border-top: none;
        border-inline: none;
        background-color: var(--color-white);
        
    }

    ul li:hover{
        background-color: var(--color-grayLight);
        transition: 0.3s ease;
    }

    ul li{

        display: flex;
        width: 700px;
        align-items: center;
        height: 25%;
        font-size: 18px;
        border: solid 1px var(--color-gray);
        border-bottom: none;

    }

    .link {
        text-decoration: none; 
        color: black; 
    }

    .number{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: var(--color-gray)
    }

    @media (max-width: 768px) {
        main img {
            width: 300px;
        }

        .encuestas__container {
            width: 100%;
            height: 300px;
        }

        ul li{
            display: flex;
            width: 100%;
            justify-content: start;
            font-size: 16px;
            padding-right: 20px;
        }

        .number {
            width: 70px;
            min-width: 70px;
        }
    }


</style>