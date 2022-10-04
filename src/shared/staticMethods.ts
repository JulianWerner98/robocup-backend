export class StaticMethods {
    static getSearchParam(user: any): string {
        if (user.realm_access.roles.includes('berlin')) return 'Berlin'
        if (user.realm_access.roles.includes('hamburg')) return 'Hamburg'
        if (user.realm_access.roles.includes('hannover')) return 'Hannover'
        if (user.realm_access.roles.includes('kassel')) return 'Kassel'
        if (user.realm_access.roles.includes('mannheim')) return 'Mannheim'
        if (user.realm_access.roles.includes('sanktAugustin')) return 'Sankt Augustin'
        if (user.realm_access.roles.includes('voehringen')) return 'Vöhringen'
        return ""
    }
}