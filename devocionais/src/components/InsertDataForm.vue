<template>
    <form class="form-container">
        <div class="form-group">
            <label for="theme">Tema desejado</label>
            <select id="theme" v-model="formData.theme">
                <option value="" disabled selected>Selecione um tema</option>
                <option value="paz">Paz</option>
                <option value="gratidao">Gratidão</option>
                <option value="sabedoria">Sabedoria</option>
                <option value="perseveranca">Perseverança</option>
                <option value="amor">Amor</option>
            </select>
        </div>

        <div class="form-group">
            <label for="mood">Como você está se sentido hoje?</label>
            <select id="mood" v-model="formData.mood">
                <option value="" disabled selected>Como você está se sentindo?</option>
                <option value="feliz">Feliz</option>
                <option value="ansioso">Ansioso</option>
                <option value="triste">Triste</option>
                <option value="reflexivo">Reflexivo</option>
                <option value="preocupado">Preocupado</option>
            </select>
        </div>

        <div class="form-group">
            <label for="readingTime">Quanto tempo disponível para a leitura?</label>
            <select id="readingTime" v-model="formData.readingTime">
                <option value="" disabled selected>Selecione o tempo</option>
                <option value="5">3 minutos</option>
                <option value="10">5 minutos</option>
                <option value="15">10 minutos</option>
            </select>
        </div>

        <button type="submit" class="submit-button">Visualizar o seu devocional</button>
    </form>
</template>

<script>
export default {
    name: 'InsertDataForm',
    data() {
        return {
            formData: {
                name: '',
                theme: '',
                mood: '',
                readingTime: ''
            },
            generatedContent: ''
        }
    }
}
</script>