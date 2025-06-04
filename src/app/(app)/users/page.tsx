"use client"

import { useEffect, useState } from "react"
import { getUserById, getUsers } from "@/actions/user"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


export interface AllUsers {
    "id": number,
    "name": string,
    "surname": string,
    "email": string,
    "headline": string,
    "bio": string,
    "profileImage": string,
    "socialLinks": string,
    "userRole": string, // Enum value from Role
    "group": {
        "id": number,
        "name": string,
        "description": string,
        "createdAt": Date,
        "updatedAt": Date
    },
    "role": {
        "id": number,
        "status": string,
        "createdAt": Date,
        "updatedAt": Date
    }
}


export default function UsersPage() {
    const [users, setUsers] = useState<AllUsers[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUsers() {
            try {
                // TODO: Replace with actual API call to get all users
                const response = await getUsers()
                if (!response) throw new Error('Failed to fetch users')
                setUsers(response)
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Group</TableHead>
                                <TableHead>Courses</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src={`/api/users/${user.id}/profile/image`} />
                                            <AvatarFallback>
                                                {user.name?.charAt(0) || user.email.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.name || 'No name'}</div>
                                            {user.surname && <div className="text-sm text-muted-foreground">{user.surname}</div>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.userRole === 'admin' ? 'destructive' : 'default'}>
                                            {user.userRole}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.group ? (
                                            <Badge variant="outline">{user.group.name}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground">No group</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.courses?.length ? (
                                            <div className="flex flex-wrap gap-1">
                                                {user.courses.map((course) => (
                                                    <Badge key={course.id} variant="secondary">
                                                        {course.title}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">No courses</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
