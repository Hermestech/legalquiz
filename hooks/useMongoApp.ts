import * as React from 'react';
import * as Realm from 'realm-web';

export function useMongoApp() { 
    const [app, setApp] = React.useState<Realm.App | null>(null);
    React.useEffect(() => {
        setApp(Realm.getApp(process.env.NEXT_PUBLIC_REALM_APP_ID!))
    }, []);
    return app;
}